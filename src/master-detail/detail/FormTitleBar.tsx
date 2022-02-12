import { Container } from "@mui/material";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)`
  width: 100%;
  border-bottom: solid thin lightgray;
`;
export function FormTitleBar() {
  return (
    <StyledContainer>
      <h2>Add Edit Ticket</h2>
    </StyledContainer>
  );
}
