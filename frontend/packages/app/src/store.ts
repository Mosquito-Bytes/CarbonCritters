import { configureStore } from "@reduxjs/toolkit";
import websocketMiddleware from "./state/middleware/websocket";
import Socket from "./util/websocket";
import { default as websocketReducer } from "./state/slices/websocket";
import { default as leaderboardReducer } from "./state/slices/leaderboard";
import { default as userReducer } from "./state/slices/user";
import { default as critterReducer } from "./state/slices/critter";

const store = configureStore({
	reducer: {
		websocket: websocketReducer,
		leaderboard: leaderboardReducer,
		user: userReducer,
		critter: critterReducer,
	},
	middleware: () => [websocketMiddleware(new Socket())],
	devTools: true,
});

export type GetState = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
