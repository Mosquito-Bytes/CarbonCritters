import { useEffect, memo, useCallback } from "react";
import { connect, disconnect, echo } from "./state/slices/websocket";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import AppFrame from "./components/AppFrame";
import SplitView from "./components/SplitView";
import CritterCage from "./components/CritterCage/CritterCage";
import Leaderboard from "./components/Leaderboard";

const App = memo(function App() {
  const dispatch = useAppDispatch();
  const { connected } = useAppSelector((state) => state.websocket);

  const handleConnect = useCallback(() => {
    const currentUserId = new URL(window.location.href).searchParams;
    const targetSocketUrl = new URL("ws://carboncritters-r4tyfpczpq-ez.a.run.app");
    targetSocketUrl.searchParams.set("userId", currentUserId.get("userId"));
    dispatch(connect(targetSocketUrl));
  }, [dispatch]);

  const handleDisconnect = useCallback(() => {
    dispatch(disconnect());
  }, [dispatch]);

  useEffect(() => {
    const getOnMyCallStack = setTimeout(() => {
      if (!connected) {
        handleConnect();
      }
    }, 0);

    return () => {
      clearTimeout(getOnMyCallStack);
      if (connected) {
        handleDisconnect();
      }
    };
  }, []);

  return (
    <AppFrame>
      <SplitView left={<CritterCage />} right={<Leaderboard />} />
    </AppFrame>
  );

  /*
  return (
    <AppFrame>
      <button onClick={handleConnect} disabled={connected}>
        connect
      </button>
      <button onClick={handleDisconnect} disabled={!connected}>
        disconnect
      </button>
      <button onClick={handleDecrement} disabled={!connected}>
        decrement
      </button>
      <button onClick={handleIncrement} disabled={!connected}>
        increment
      </button>
    </AppFrame>
  );
  */
});

export default App;
