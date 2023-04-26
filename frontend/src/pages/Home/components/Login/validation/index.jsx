import * as Yup from "yup";

export const loginSchema = Yup.object({
  userName: Yup.string().min(2).max(50).required("Please enter your user name"),
  password: Yup.string().min(8).required("Please enter your password"),
});
