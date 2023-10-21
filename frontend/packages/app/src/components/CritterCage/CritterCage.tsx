import styled from "styled-components";
import React from "react";
import Lottie from "lottie-react";
import critter from "../../assets/Critter_Animations-2.json";

const Wrapper = styled.div`
  position: relative;
  border: 1px solid red;
`;

const CritterName = styled.h1`
  border: 1px solid blue;
`;

const CritterLayer = styled.div`
  border: 1px solid green;
`;

const CritterCage: React.FC = () => {
  return (
    <Wrapper>
      <CritterName>Critter Name</CritterName>
      <CritterLayer>
        <Lottie animationData={critter} />
      </CritterLayer>
    </Wrapper>
  );
};

export default CritterCage;
