import styled from "styled-components";
import React from "react";

const CarbonCritters = styled.h1`
  text-align: center;
  color: var(--color-african-violet);
  background-color: var(--color-spacecadet-purple);
  margin: 0;
  padding: 1rem;
`;
CarbonCritters.defaultProps = {
  children: (
    <span>
      <span className="carbon">C</span>arbon <span className="critters">C</span>
      ritters
    </span>
  ),
};

const Logo: React.FC = () => {
  return <CarbonCritters />;
};

const Main = styled.main`
  display: grid;
  grid-template-areas: "header" "section";
  min-height: 100vh;
  grid-template-rows: auto 1fr;
`;
const Header = styled.header`
  grid-area: header;
  background: white;
`;
const Section = styled.section`
  grid-area: section;
`;

const AppFrame: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <Header>
        <Logo />
      </Header>
      <Section>{children}</Section>
    </Main>
  );
};

export default AppFrame;
