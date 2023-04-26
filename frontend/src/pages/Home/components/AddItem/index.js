import React from "react";
import CustomInput from "../../../../components/styled/CustomInput";
import Button from "../../../../components/styled/Button";
import styled from "styled-components";
import ActionSection from "../../../../components/styled/ActionSection";
import MainSection from "../../../../components/styled/MainSection";

import { useFormik } from "formik";
import { addItemSchema } from "./validation";
import { addPreviewItem } from "../../../../store/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ErrorLabel from "../../../../components/styled/ErrorLabel";
import Label from "../../../../components/styled/Label";

const Form = styled.form`
  width: 50%;
`;

const Select = styled.select`
  display: "block";
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  boxsizing: border-box;
`;

const SelectItem = styled.option`
  width: 100%;
  font-size: 1rem;
`;
const FieldSection = styled.div`
  width: 100%;
`;

export default function AddItem() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.user.firstName);
  const initialValues = {
    itemName: "",
    state: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: addItemSchema,
      onSubmit: (values, action) => {
        const data = {
          userName,
          itemName: values.itemName,
          state: values.state,
          date: moment.utc().format("DD-MM-YYYY HH:MM"),
        };
        action.resetForm();
        dispatch(addPreviewItem(data));
      },
    });

  return (
    <Form onSubmit={handleSubmit}>
      <MainSection>
        <FieldSection>
          <div>
            <Label>Enter Name</Label>
            <CustomInput
              value={values.itemName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="itemName"
              placeholder="Enter Name"
            />
            {touched.itemName && errors.itemName ? (
              <ErrorLabel>{errors.itemName}</ErrorLabel>
            ) : null}
          </div>
          <div>
            <Label>Select State</Label>
            <Select
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <SelectItem value="" disabled>
                Select A State
              </SelectItem>
              <SelectItem value={"Active"}>Active</SelectItem>
              <SelectItem value={"Not Active"}>Not Active</SelectItem>
            </Select>
            {touched.state && errors.state ? (
              <ErrorLabel>{errors.state}</ErrorLabel>
            ) : null}
          </div>
        </FieldSection>
      </MainSection>
      <ActionSection>
        <Button type="submit">Add Item</Button>
      </ActionSection>
    </Form>
  );
}
