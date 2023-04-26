import React from "react";
import Main from "../../layouts/Main";
import Login from "./components/Login";
import AddItem from "./components/AddItem";
import Preview from "./components/Preview";
import ListItem from "./components/ListItem";
import { useSelector } from "react-redux";

export default function Home() {
  const step = useSelector((state) => state.user.userProgressedStep);

  const loadSection = (step) => {
    switch (step) {
      case 1:
        return <Login />;
      case 2:
        return <AddItem />;
      case 3:
        return <Preview />;
      case 4:
        return <ListItem />;
      default:
        return null;
    }
  };
  return <Main>{loadSection(step)}</Main>;
}
