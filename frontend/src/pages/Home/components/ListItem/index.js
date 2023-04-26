import React, { useState } from "react";
import Button, { OutlineButton } from "../../../../components/styled/Button";
import styled from "styled-components";
import ActionSection from "../../../../components/styled/ActionSection";
import MainSection from "../../../../components/styled/MainSection";
import EditItemPopup from "./components/EditItemPopup";
import DeleteItemPopup from "./components/DeleteItemPopup";
import CustomModal from "../../../../components/CustomModel";
import { goStepBack, loadItems } from "../../../../store/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  width: 100%;
`;
const EditBtn = styled.a`
  color: blue;
`;
const DeleteBtn = styled.a`
  color: red;
`;
const CustomActionSection = styled(ActionSection)`
  justify-content: center;
  gap: 2rem;
`;
const Table = styled.table`
  width: 100%;
  border: 0.2rem solid ${(props) => props.theme.primaryColor};
  border-collapse: collapse;
`;
const Th = styled.th`
  border: 0.2rem solid ${(props) => props.theme.primaryColor};
  border-collapse: collapse;
  padding: 1rem;
`;
const Td = styled.td`
  border: 0.2rem solid ${(props) => props.theme.primaryColor};
  border-collapse: collapse;
  padding: 0.5rem 1rem;
`;

const ActionButtons = ({ editHandler, deleteHandler, data }) => {
  return (
    <>
      <div style={{ display: "flex", gap: "10%" }}>
        <EditBtn onClick={() => editHandler(data)} href="#">
          Edit
        </EditBtn>
        <DeleteBtn onClick={() => deleteHandler(data)} href="#">
          Delete
        </DeleteBtn>
      </div>
    </>
  );
};

export default function ListItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.user.items);
  const token = useSelector((state) => state.user.token);

  const [showPopup, setShowPopup] = React.useState(false);
  const [popup, setPopup] = React.useState({ action: "edit", data: null });
  const closePopup = () => setShowPopup(() => false);
  const popupProps = {
    showModal: showPopup,
    closeModal: closePopup,
  };

  const editHandler = (data = null) => {
    setShowPopup(() => true);
    setPopup((prev) => ({ ...prev, action: "edit", data }));
  };
  const deleteHandler = (data = null) => {
    setShowPopup(() => true);
    setPopup((prev) => ({ ...prev, action: "delete", data }));
  };

  const updateItem = (data = null, values) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/user/items/${data._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setShowPopup(() => false);
        loadData();
      })
      .catch(function (error) {});
  };

  const deleteItem = (data = null) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/user/items/${data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setShowPopup(() => false);
        loadData();
      })
      .catch(function (error) {});
  };

  const actionBtnProps = {
    editHandler,
    deleteHandler,
  };

  const loadData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch(loadItems(response.data.data));
      })
      .catch(function (error) {});
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useState(() => {
    loadData();
  }, [items]);

  return (
    <>
      <Container>
        <MainSection>
          <Table>
            <thead>
              <tr>
                <Th>Item Name</Th>
                <Th>User Added</Th>
                <Th>Date Added</Th>
                <Th>State</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {items.map((data, index) => {
                return (
                  <tr key={index}>
                    <Td>{data?.itemName}</Td>
                    <Td>{data?.userName}</Td>
                    <Td>{data?.date}</Td>
                    <Td>{data?.state}</Td>
                    <Td>{<ActionButtons {...actionBtnProps} data={data} />}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </MainSection>
        <CustomActionSection>
          <OutlineButton onClick={() => dispatch(goStepBack(2))}>
            Add More Items
          </OutlineButton>
          <Button onClick={logout}>Log Out</Button>
        </CustomActionSection>
      </Container>
      <CustomModal {...popupProps}>
        {popup.action === "edit" ? (
          <EditItemPopup
            cancel={closePopup}
            data={popup.data}
            confirm={updateItem}
          />
        ) : (
          <DeleteItemPopup
            cancel={closePopup}
            confirm={deleteItem}
            data={popup.data}
          />
        )}
      </CustomModal>
    </>
  );
}
