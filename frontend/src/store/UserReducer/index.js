import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  loading: false,
  authenticationStatus: false,
  userProgressedStep: 1,
  previewItems: [],
  items: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticationStatus = true;
      state.userProgressedStep = 2;
    },
    addPreviewItem: (state, action) => {
      state.previewItems = [...state.previewItems, action.payload];
      state.userProgressedStep = 3;
    },
    clearPreviewItems: (state, action) => {
      state.previewItems = [];
    },
    loadItems: (state, action) => {
      state.items = action.payload;
    },
    goStepBack: (state, action) => {
      state.userProgressedStep = action.payload || --state.userProgressedStep;
    },
    goStepNext: (state, action) => {
      state.userProgressedStep = ++state.userProgressedStep;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginSuccess,
  addPreviewItem,
  goStepBack,
  goStepNext,
  loadItems,
  clearPreviewItems,
} = userSlice.actions;

export default userSlice.reducer;
