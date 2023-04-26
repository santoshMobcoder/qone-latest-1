import axios from "axios";
import * as Yup from "yup";

export const editItemSchema = (data) =>
  Yup.object({
    itemName: Yup.string()
      .min(2)
      .max(25)
      .test(
        "check-unique-name",
        "Item name must be unique",
        async function (value) {
          const status = await axios.post(
            process.env.REACT_APP_BASE_URL + "/user/items/isunique",
            {
              itemName: value,
              id: data._id,
            }
          );
          if (status.data.data.status) return true;
          return false;
        }
      )
      .required("Please provide item name"),
    state: Yup.string().min(6).required("Please choose state"),
  });
