import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/hooks";
import Lottie from "lottie-react";
import cyanCritter from "../../assets/Critter_Animations_Cyan.json";
import orangeCritter from "../../assets/Critter_Animations_Orange.json";
import violetCritter from "../../assets/Critter_Animations_Violet.json";

const critters = {
  cyan: cyanCritter,
  orange: orangeCritter,
  violet: violetCritter,
};

const mapCritterIdToColor = {
  0: "cyan",
  1: "orange",
  2: "violet",
};

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
  const { critter, score } = useAppSelector((state) => state.user);
  const { segments } = useAppSelector((state) => state.critter);
  const ref = useRef<any>();

  useEffect(() => {
    if (score.diff < 0) {
      ref.current.playSegments(segments.sad);
    }

    if (score.diff > 0) {
      ref.current.playSegments(segments.happy);
    }
  }, [score, segments]);

  return (
    <Wrapper>
      <CritterName>
        {critter.name} {score.diff}
      </CritterName>
      <CritterLayer>
        <Lottie
          lottieRef={ref}
          initialSegment={segments.idle}
          animationData={critters[mapCritterIdToColor[critter.id]]}
        />
      </CritterLayer>
    </Wrapper>
  );
};

export default CritterCage;
