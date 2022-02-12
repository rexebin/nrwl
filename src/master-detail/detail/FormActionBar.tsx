import { useNavigate } from "react-router";
import { Button, Container } from "@mui/material";
import { MdCancel, MdSave } from "react-icons/md";
import styled from "@emotion/styled";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
`;

export function FormActionBar({ isLoading }: { isLoading: boolean }) {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("../");
  };
  return (
    <StyledContainer>
      <Button
        disabled={isLoading}
        color={"primary"}
        type={"submit"}
        variant={"contained"}
        startIcon={<MdSave />}
        sx={{ marginRight: "1rem" }}
      >
        Save
        {isLoading !== undefined ? (
          <LoadingSpinner isLoading={isLoading} />
        ) : null}
      </Button>
      <Button
        disabled={isLoading}
        color={"error"}
        variant={"contained"}
        startIcon={<MdCancel />}
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
    </StyledContainer>
  );
}
