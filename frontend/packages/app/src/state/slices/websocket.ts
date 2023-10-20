import { createSlice } from "@reduxjs/toolkit";

interface WebsocketState {
	connected: boolean;
}

const initialState = { connected: false } as WebsocketState;

const websocketSlice = createSlice({
	name: "websocket",
	initialState,
	reducers: {
		connect(state) {
			state.connected = true;
		},
		disconnect(state) {
			state.connected = false;
		},
	},
});

export const { connect, disconnect } = websocketSlice.actions;
export default websocketSlice.reducer;
