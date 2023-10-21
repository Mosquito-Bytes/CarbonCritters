import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  border: 1px solid green;
`;
const Split = styled.div`
  border: 1px solid red;
`;

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
