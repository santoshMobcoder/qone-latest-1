import * as Yup from "yup";
import * as UserService from "../../../../../services/user";

export const editItemSchema = (data) =>
  Yup.object({
    itemName: Yup.string()
      .min(2)
      .max(25)
      .test(
        "check-unique-name",
        "Item name must be unique",
        async function (value) {
          const body = {
            itemName: value,
            id: data._id,
          };
          const status = await UserService.isUniqueItem({ body });

          if (status.data.status) return true;
          return false;
        }
      )
      .required("Please provide item name"),
    state: Yup.string().min(6).required("Please choose state"),
  });
