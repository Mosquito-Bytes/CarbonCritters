import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { useAppSelector } from "../../hooks/hooks";

const ItemWrapper = styled(motion.li)`
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
ItemWrapper.defaultProps = {
  layout: true,
};
const ItemRank = styled.p`
  border: 1px solid yellow;
  margin: 0;
`;
const ItemUserName = styled.p`
  border: 1px solid purple;
  margin: 0;
`;
const ItemScoreWrapper = styled.p`
  border: 1px solid green;
  margin: 0;
`;
const ItemScoreTotal = styled.span`
  border: 1px solid red;
`;
const ItemScoreDiff = styled.span`
  border: 1px solid gold;
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
        <ItemScoreTotal>{score}</ItemScoreTotal>
        <ItemScoreDiff>({diff})</ItemScoreDiff>
      </ItemScoreWrapper>
    </ItemWrapper>
  );
};

const LeaderboardContainer = styled(motion.ol)`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Leaderboard: React.FC = () => {
  const items = useAppSelector((state) => state.leaderboard.items);

  if (!items.length) {
    return null;
  }

  return (
    <LeaderboardContainer>
      <AnimatePresence>
        {items.map((item, i) => (
          <LeaderboardItem
            key={item.userId}
            name={item.name || item.userId.toString()}
            rank={i + 1}
            score={item.score.total}
            diff={item.score.diff}
          />
        ))}
      </AnimatePresence>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
