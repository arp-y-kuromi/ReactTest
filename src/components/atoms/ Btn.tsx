import styled from "@emotion/styled";
import Button from "@mui/material/Button";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const StyledButton = styled(Button)`
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #115293;
  }
  margin-top: 20px;
`;

export const Btn = ({ children, type, onClick, disabled }: Props) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
