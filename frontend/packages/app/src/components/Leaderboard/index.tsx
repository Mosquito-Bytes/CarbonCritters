import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { useAppSelector } from "../../hooks/hooks";

const ItemWrapper = styled(motion.li)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
  background-color: var(--color-copy);
  color: var(--color-page-background);
  border-radius: 0.25rem;

  & + & {
    margin-top: 0.25rem;
  }
`;
ItemWrapper.defaultProps = {
  layout: true,
};
const ItemRank = styled.p`
  margin: 0;
  margin-right: 1em;
`;
const ItemUserName = styled.p`
  margin: 0;
  margin-right: 1rem;
  font-family: var(--font-family-guerilla);
`;
const ItemScoreWrapper = styled.p`
  margin: 0;
  margin-left: auto;
  padding-left: 1em;
`;
const ItemScoreTotal = styled.span``;
const ItemScoreDiff = styled.sup<{ diff: number }>`
  display: sub;
  ${(props) => (props.diff > 0 ? "color: var(--color-robinegg-blue);" : "")}
  ${(props) => (props.diff === 0 ? "display: none;" : "")}
    ${(props) => (props.diff < 0 ? "color: var(--color-imperial-red);" : "")}
`;

const LeaderboardItem: React.FC<{
  rank: number;
  name: string;
  score: number;
  diff: number;
}> = ({ rank, name, score, diff }) => {
  const isPresent = useIsPresent();
  const animations = {
    style: {
      position: isPresent ? "static" : "absolute",
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  } as any;

  return (
    <ItemWrapper {...animations}>
      <ItemRank>#{rank}</ItemRank>
      <ItemUserName>{name}</ItemUserName>
      <ItemScoreWrapper>
        <ItemScoreTotal>{score}</ItemScoreTotal>{" "}
        <ItemScoreDiff diff={diff}>
          {diff >= 0 ? "+" : ""}
          {diff}
        </ItemScoreDiff>
      </ItemScoreWrapper>
    </ItemWrapper>
  );
};

const LeaderboardContainer = styled(motion.ol)`
  list-style: none;
  margin: 0;
  padding: 1rem;
`;

const LeaderboardHeading = styled.h2``;

const Leaderboard: React.FC = () => {
  const items = useAppSelector((state) => state.leaderboard.items);

  return (
    <LeaderboardContainer>
      <LeaderboardHeading>Leaderboard</LeaderboardHeading>
      <AnimatePresence>
        {items.length &&
          items.map((item, i) => (
            <LeaderboardItem
              key={item.userId}
              name={item.name || item.userId.toString()}
              rank={i + 1}
              score={item.score.total}
              diff={item.score.diff}
            />
          ))}
        {!items.length && <h3>Loading...</h3>}
      </AnimatePresence>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
