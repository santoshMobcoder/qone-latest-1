import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalCSS from "./global.css.js";
import Home from "./pages/Home";

const theme = {
  primaryColor: "#ed8154",
  secondaryColor: "#992a27",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      <Home />
    </ThemeProvider>
  );
}

export default App;
