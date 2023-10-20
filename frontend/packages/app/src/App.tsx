import { useEffect } from "react";
import { connect, disconnect } from "./state/slices/websocket";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";

function App() {
  const dispatch = useAppDispatch();
  const { connected } = useAppSelector((state) => state.websocket);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!connected) {
        dispatch(connect());
      }
    }, 0);

    return () => {
      clearTimeout(timer);

      if (connected) {
        dispatch(disconnect());
      }
    };
  }, [dispatch, connected]);

  return <>Hello</>;
}

export default App;
