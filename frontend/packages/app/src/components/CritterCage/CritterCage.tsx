import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
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

const Total = styled.div<{ total: number }>`
  text-align: right;
`;
const Diff = styled.div<{ diff: number }>``;
const UserScores = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  background-color: var(--color-spacecadet-purple);
  color: var(--color-champagne-pink);
  ${Total}, ${Diff} {
    font-size: 2em;
    font-family: var(--font-family-guerilla);
    padding: 0.5em 1em;
  }
`;

const variants = {
  talking: { opacity: 1 },
  silent: { opacity: 0 },
};
const SpeechBubble = styled(motion.p)`
  display: block;
  position: absolute;
  background: white;
  border-radius: 5em;
  padding: clamp(1em, 3vw, 2em) clamp(1em, 4vw, 2em);
  font-size: clamp(0.5rem, 5vw, 2rem);
  left: 5vw;
  opacity: 0;
`;
SpeechBubble.defaultProps = { variants, transition: { duration: 0.5 } };

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
  const [showBubble, setShowBubble] = useState(false);
  const ref = useRef<any>();

  useEffect(() => {
    if (score.diff < 0) {
      ref.current.playSegments([segments.sad, segments.sad, segments.idle]);
    }

    if (score.diff > 0) {
      ref.current.playSegments([segments.happy, segments.happy, segments.idle]);
    }

    if (score.diff === 0) {
      ref.current.playSegments([
        segments.waving,
        segments.waving,
        segments.idle,
      ]);
    }
  }, [score, segments]);

  useEffect(() => {
    if (name) {
      console.log(name);
      setShowBubble(true);
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [name]);

  return (
    <Wrapper>
      <CritterLayer>
        <CritterName>{critter.name}</CritterName>
        <SpeechBubble animate={showBubble ? "talking" : "silent"}>
          Hi {name}, I missed you!
        </SpeechBubble>
        <Lottie
          lottieRef={ref}
          initialSegment={segments.idle}
          animationData={critters[mapCritterIdToColor[critter.id]]}
        />
      </CritterLayer>
      <UserScores>
        <Total total={score.total}>
          Total: <span>{score.total}</span>
        </Total>
        <Diff diff={score.diff}>
          Change: <span>{score.diff}</span>
        </Diff>
      </UserScores>
    </Wrapper>
  );
};

export default CritterCage;
