import axios from "axios";
import * as Yup from "yup";

export const addItemSchema = Yup.object({
  itemName: Yup.string()
    .min(2)
    .max(25)
    .test(
      "check-unique-name",
      "Item name must be unique",
      async function (value) {
        try {
          const status = await axios.post(
            process.env.REACT_APP_BASE_URL + "/user/items/isunique",
            {
              itemName: value,
            }
          );
          if (status.data.data.status) return true;
          return false;
        } catch (e) {
          return false;
        }
      }
    )
    .required("Please provide item name"),
  state: Yup.string().min(6).required("Please choose state"),
});
