import { useEffect } from "react";
import { connect, disconnect } from "./state/slices/websocket";
import { useAppDispatch } from "./hooks/hooks";
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect());

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);
  return <>Hello</>;
}

export default App;
