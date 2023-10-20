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
      payload: { type: "increment-counter" },
    });
  }, [dispatch]);
  const handleDecrement = useCallback(() => {
    dispatch({
      type: "ws/client/send",
      payload: { type: "decrement-counter" },
    });
  }, [dispatch]);

  useEffect(() => {
    const getOnMyCallStack = setTimeout(() => {
      if (!connected) {
        dispatch(connect());
      }
    }, 0);

    return () => {
      if (connected) {
        clearTimeout(getOnMyCallStack);
        dispatch(disconnect());
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
