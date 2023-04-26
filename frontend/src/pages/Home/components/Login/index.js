import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useFormik } from "formik";
import CustomInput from "../../../../components/styled/CustomInput";
import Button from "../../../../components/styled/Button";
import ActionSection from "../../../../components/styled/ActionSection";
import MainSection from "../../../../components/styled/MainSection";
import ErrorLabel from "../../../../components/styled/ErrorLabel";
import Label from "../../../../components/styled/Label";
import { loginSchema } from "./validation";
import { loginSuccess } from "../../../../store/UserReducer";
import * as UserService from "../../../../services/user";

const Form = styled.form`
  width: 50%;
`;
const FieldSection = styled.div`
  width: 100%;
`;

export default function Login() {
  const dispatch = useDispatch();
  const initialValues = {
    userName: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        const data = {
          email: values.userName,
          password: values.password,
        };

        UserService.loginUser({ body: data })
          .then((res) => {
            action.resetForm();
            dispatch(loginSuccess(res.data));
          })
          .catch(function (error) {
            alert("Wrong user name or password");
          });
      },
    });

  return (
    <Form onSubmit={handleSubmit}>
      <MainSection>
        <FieldSection>
          <div>
            <Label>Enter User Name</Label>
            <CustomInput
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="userName"
              placeholder="Enter User Name"
            />
            {touched.userName && errors.userName ? (
              <ErrorLabel>{errors.userName}</ErrorLabel>
            ) : null}
          </div>
          <div>
            <Label>Enter Password</Label>
            <CustomInput
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              placeholder="Enter Password"
            />
            {touched.password && errors.password ? (
              <ErrorLabel>{errors.password}</ErrorLabel>
            ) : null}
          </div>
        </FieldSection>
      </MainSection>
      <ActionSection>
        <Button type="submit">Log In</Button>
      </ActionSection>
    </Form>
  );
}
