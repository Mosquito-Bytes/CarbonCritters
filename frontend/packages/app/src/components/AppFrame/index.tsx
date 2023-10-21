import styled from "styled-components";
import React from "react";

const Main = styled.main`
  border: 1px solid blue;
`;
const Header = styled.header`
  border: 1px solid green;
`;
const Section = styled.section`
  border: 1px solid red;
`;

const AppFrame: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <Header>Header</Header>
      <Section>{children}</Section>
    </Main>
  );
};

export default AppFrame;
