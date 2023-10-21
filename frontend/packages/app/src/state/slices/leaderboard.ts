import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

export type Score = {
	total: number;
	diff: number;
};
export type LeaderboardItem = {
	userId: number;
	name: string;
	score: Score;
};

export interface LeaderboardState {
	items: LeaderboardItem[];
}

const addItems = createAction<{ users: LeaderboardState["items"] }>(
	"ws/server/leaderBoard",
);

const initialState = { items: [] } as LeaderboardState;

const leaderboardSlice = createSlice({
	name: "ws/server/leaderBoard",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(addItems, (state, action) => {
			// action is inferred correctly here if using TS
			state.items = action.payload.users;
		});
	},
});

export default leaderboardSlice.reducer;
