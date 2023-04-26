import React from "react";
import Button, { OutlineButton } from "../../../../components/styled/Button";
import styled from "styled-components";
import ActionSection from "../../../../components/styled/ActionSection";
import MainSection from "../../../../components/styled/MainSection";
import {
  goStepBack,
  goStepNext,
  clearPreviewItems,
} from "../../../../store/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  width: 40%;
`;

const Value = styled.div`
  font-size: 1.2rem;
  padding: 1rem 0;
  color: #808080;
`;

const Label = styled(Value)`
  font-weight: 600;
`;
const CustomActionSection = styled(ActionSection)`
  justify-content: center;
  gap: 2rem;
`;

export default function Preview() {
  const dispatch = useDispatch();
  const previewItems = useSelector((state) => state.user.previewItems);
  const token = useSelector((state) => state.user.token);

  const saveData = async () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/items`,
        {
          items: previewItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(goStepNext());
        dispatch(clearPreviewItems());
      })
      .catch(function (error) {});
  };

  return (
    <Container>
      {previewItems.map(({ itemName, state, userName, date }, key) => {
        return (
          <MainSection key={key}>
            <div>
              <Label>Item Name</Label>
              <Label>User Added</Label>
              <Label>Date Added</Label>
              <Label>State</Label>
            </div>
            <div>
              {" "}
              <Value>{itemName}</Value>
              <Value>{userName || " - "}</Value>
              <Value>{date || " - "}</Value>
              <Value>{state}</Value>
            </div>
          </MainSection>
        );
      })}
      <CustomActionSection>
        <OutlineButton onClick={() => dispatch(goStepBack())}>
          Add More Items
        </OutlineButton>
        <Button onClick={saveData}>Submit</Button>
      </CustomActionSection>
    </Container>
  );
}
