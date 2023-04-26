import styled from "styled-components";

const Button = styled.button`
  display: block;
  padding: 0.8rem 3.5rem;
  color: #fff;
  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.secondaryColor
      : props.theme.primaryColor};
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  width: 15rem;
`;

export const OutlineButton = styled.button`
  display: block;
  padding: 0.8rem 3.5rem;
  color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.secondaryColor
      : props.theme.primaryColor};
  border-radius: 0.5rem;
  font-weight: 600;
  border: 0.2rem solid
    ${(props) =>
      props.variant === "secondary"
        ? props.theme.secondaryColor
        : props.theme.primaryColor};
  font-size: 1rem;
  cursor: pointer;
  width: 15rem;
`;

export default Button;
