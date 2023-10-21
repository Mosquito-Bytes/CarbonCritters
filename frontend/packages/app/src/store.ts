import { configureStore } from "@reduxjs/toolkit";
import websocketMiddleware from "./state/middleware/websocket";
import Socket from "./util/websocket";
import { default as websocketReducer } from "./state/slices/websocket";
import { default as leaderboardReducer } from "./state/slices/leaderboard";

const store = configureStore({
	reducer: {
		websocket: websocketReducer,
		leaderboard: leaderboardReducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		websocketMiddleware(new Socket()),
	],
	devTools: true,
});

export type GetState = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
