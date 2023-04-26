import React from "react";
import styled from "styled-components";
import Button, {
  OutlineButton,
} from "../../../../../../components/styled/Button";
import ActionSection from "../../../../../../components/styled/ActionSection";

const MessageSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0.5rem 1.5rem;
  gap: 2rem;
  margin-top: 2rem;
`;
const Title = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.secondaryColor};
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem 0.5rem 0 0;
  color: #fff;
  font-weight: 600;
`;

const CustomActionSection = styled(ActionSection)`
  justify-content: space-around;
  gap: 1rem;
  box-sizing: border-box;
`;
const Message = styled.p`
  color: ${(props) => props.theme.secondaryColor};
  font-weight: 600;
`;

export default function DeleteItemPopup({ cancel, confirm, data }) {
  return (
    <>
      <Title>Warning</Title>
      <MessageSection style={{ flex: 1 }}>
        <Message>Are you Sure?</Message>
        <CustomActionSection>
          <OutlineButton
            onClick={(e) => {
              e.preventDefault();
              cancel();
            }}
            variant="secondary"
          >
            No, Keep
          </OutlineButton>
          <Button onClick={() => confirm(data)} variant="secondary">
            Yes, Delete
          </Button>
        </CustomActionSection>
      </MessageSection>
    </>
  );
}
