import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {}

const initialState = {} as CounterState;

const websocketSlice = createSlice({
	name: "websocket",
	initialState,
	reducers: {
		connect(state) {
			return state;
		},
		disconnect(state) {
			return state;
		},
	},
});

export const { connect, disconnect } = websocketSlice.actions;
export default websocketSlice.reducer;
