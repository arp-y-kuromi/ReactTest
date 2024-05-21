import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
};

const StyledErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #f87171;
  margin-left: 1.25rem;
  margin-top: 0.25rem;
`;

export const ErrorMessage = (props: Props) => {
  return <StyledErrorMessage>{props.children}</StyledErrorMessage>;
};
