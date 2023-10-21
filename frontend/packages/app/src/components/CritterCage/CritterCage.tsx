import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/hooks";
import Lottie from "lottie-react";
import cyanCritter from "../../assets/Critter_Animations_Cyan.json";
import orangeCritter from "../../assets/Critter_Animations_Orange.json";
import violetCritter from "../../assets/Critter_Animations_Violet.json";
import bg from "../../assets/critter-bg.png";

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
  padding: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  text-align: center;
  color: var(--color-carrot-orange);
  text-shadow: 2px 2px 2px black;
`;

const CritterLayer = styled.div`
background-image: url(${bg});
background-size: cover;
background-position: bottom;
position: relative;
  background-color: white;
  overflow: hidden;
`;

const CritterCage: React.FC = () => {
  const { critter, score, name } = useAppSelector((state) => state.user);
  const { segments } = useAppSelector((state) => state.critter);
  const ref = useRef<any>();

  console.log(critter)

  useEffect(() => {
    if (score.diff < 0) {
      ref.current.playSegments(segments.sad);
    }

    if (score.diff > 0) {
      ref.current.playSegments(segments.happy);
    }

    if (score.diff === 0) {
        ref.current.playSegments([segments.waving, segments.idle])
    }
  }, [score, segments]);

  return (
    <Wrapper>
      <CritterLayer>
      <CritterName>
        {critter.name}
      </CritterName>
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
