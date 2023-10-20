import { useEffect, memo, useCallback } from "react";
import { connect, disconnect, echo } from "./state/slices/websocket";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";

const App = memo(function App() {
  const dispatch = useAppDispatch();
  const { connected } = useAppSelector((state) => state.websocket);

  const handleConnect = useCallback(() => {
    dispatch(connect());
  }, [dispatch]);

  const handleDisconnect = useCallback(() => {
    dispatch(disconnect());
  }, [dispatch]);

  const handleIncrement = useCallback(() => {
    dispatch({
      type: "ws/client/send",
      payload: { type: "ws/server/increment-counter" },
    });
  }, [dispatch]);
  const handleDecrement = useCallback(() => {
    dispatch({
      type: "ws/client/send",
      payload: { type: "ws/server/decrement-counter" },
    });
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
    <>
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
    </>
  );
});

export default App;
