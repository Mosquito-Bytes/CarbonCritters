import styled from "styled-components";
import React from "react";
import Lottie from "lottie-react";
import critter from "../../assets/Critter_Animations-2.json";

const Wrapper = styled.div`
  position: relative;
`;

const CritterName = styled.h1`
  padding: 0 1rem;
`;

const CritterLayer = styled.div`
  background-color: white;
  overflow: hidden;
`;

const CritterCage: React.FC = () => {
  return (
    <Wrapper>
      <CritterName>Boncar the Fluffy</CritterName>
      <CritterLayer>
        <Lottie animationData={critter} />
      </CritterLayer>
    </Wrapper>
  );
};

export default CritterCage;
