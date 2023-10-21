import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CritterState = {
	activeVariant: "cyan" | "orange" | "violet";
	segments: Record<string, [number, number]>;
};

const initialState = {
	activeVariant: "orange",
	segments: {
		idle: [0, 49],
		waving: [50, 150],
		sad: [151, 299],
		happy: [314, 449],
	},
} as CritterState;

const critterSlice = createSlice({
	name: "critter",
	initialState,
	reducers: {
		setActiveVariant(
			state,
			action: PayloadAction<CritterState["activeVariant"]>,
		) {
			state.activeVariant = action.payload;
		},
	},
});

export const { setActiveVariant } = critterSlice.actions;
export default critterSlice.reducer;
