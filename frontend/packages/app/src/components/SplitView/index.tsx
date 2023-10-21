import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "left" "right";
`;

const Split = styled.div``;

const SplitView: React.FC<{
  left: React.ReactElement;
  right: React.ReactElement;
}> = ({ left, right }) => {
  return (
    <Wrapper>
      <Split>{left}</Split>
      <Split>{right}</Split>
    </Wrapper>
  );
};

export default SplitView;
