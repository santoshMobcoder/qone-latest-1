import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";

import CustomInput from "../../../../../../components/styled/CustomInput";
import Button, {
  OutlineButton,
} from "../../../../../../components/styled/Button";
import ActionSection from "../../../../../../components/styled/ActionSection";
import MainSection from "../../../../../../components/styled/MainSection";
import ErrorLabel from "../../../../../../components/styled/ErrorLabel";
import Label from "../../../../../../components/styled/Label";
import { editItemSchema } from "../../validation";

const Form = styled.form`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;
const Container = styled.div`
  width: 50rem;
`;
const Title = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.primaryColor};
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem 0.5rem 0 0;
  color: #fff;
  font-weight: 600;
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

const CustomActionSection = styled(ActionSection)`
  justify-content: end;
  gap: 1rem;
`;

export default function EditItemPopup({ cancel, data, confirm }) {
  const initialValues = {
    itemName: data?.itemName || "",
    state: data?.state || "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: editItemSchema(data),
      onSubmit: (values, action) => {
        confirm(data, values).then(() => {
          action.resetForm();
          cancel();
        });
      },
    });

  return (
    <Container>
      <Title>Edit Item</Title>
      <Form onSubmit={handleSubmit}>
        <MainSection>
          <FieldSection>
            <div>
              <Label>Enter Name</Label>
              <CustomInput
                value={values.itemName}
                name="itemName"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Name"
              />
              {touched.itemName && errors.itemName ? (
                <ErrorLabel>{errors.itemName}</ErrorLabel>
              ) : null}
            </div>
            <div>
              <Label>Select State</Label>
              <Select
                value={values.state}
                name="state"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <SelectItem value="" disabled>
                  Select A State
                </SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Not Active">Not Active</SelectItem>
              </Select>
              {touched.state && errors.state ? (
                <ErrorLabel>{errors.state}</ErrorLabel>
              ) : null}
            </div>
          </FieldSection>
        </MainSection>
        <CustomActionSection>
          <OutlineButton
            onClick={(e) => {
              e.preventDefault();
              cancel();
            }}
          >
            Cancel
          </OutlineButton>
          <Button type="submit">Save</Button>
        </CustomActionSection>
      </Form>
    </Container>
  );
}
