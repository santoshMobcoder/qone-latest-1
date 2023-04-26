import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
`;
const NavItem = styled.div`
  border: 0.2rem solid ${(props) => props.theme.primaryColor};
  color: ${(props) => (props.filled ? "#fff" : props.theme.primaryColor)};
  background-color: ${(props) =>
    props.filled ? props.theme.primaryColor : "#fff"};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Title = styled.p`
  margin: 0;
  padding-bottom: 1.5rem;
`;

export default function Main({ children }) {
  const step = useSelector((state) => state.user.userProgressedStep);

  const shouldFilled = (section) => {
    if (section <= step) return true;
    return false;
  };

  return (
    <div>
      <NavBar>
        <NavItem filled={shouldFilled(1)}>
          <h2>Step 1</h2>
          <Title>Log In User</Title>
        </NavItem>
        <NavItem filled={shouldFilled(2)}>
          <h2>Step 2</h2>
          <Title>Add Item</Title>
        </NavItem>
        <NavItem filled={shouldFilled(3)}>
          <h2>Step 3</h2>
          <Title>Preview Item</Title>
        </NavItem>
        <NavItem filled={shouldFilled(4)}>
          <h2>Step 4</h2>
          <Title>Edit Item</Title>
        </NavItem>
      </NavBar>
      <Content>{children}</Content>
    </div>
  );
}
