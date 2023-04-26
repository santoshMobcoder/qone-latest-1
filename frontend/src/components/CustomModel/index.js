import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

const ModalBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: brightness(0.8);
  overflow-y: hidden;
`;
const ModalContent = styled.div`
  position: fixed;
  background-color: #fff;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 30%);
  border-radius: 0.5rem;
`;

const CustomModal = ({ showModal, closeModal, children }) => {
  if (showModal)
    return ReactDOM.createPortal(
      <>
        <ModalBg onClick={closeModal} />
        <ModalContent>{children}</ModalContent>
      </>,
      document.getElementById("modal-section")
    );

  return null;
};
export default CustomModal;
