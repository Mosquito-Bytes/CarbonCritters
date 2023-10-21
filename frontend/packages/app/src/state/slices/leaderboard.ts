import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";

type Score = {
	total: number;
	diff: number;
};
type LeaderboardItem = {
	userId: number;
	name: string;
	score: Score;
};

interface LeaderboardState {
	items: LeaderboardItem[];
}

const addItems = createAction<{ users: LeaderboardState["items"] }>(
	"ws/server/leaderboard",
);

const initialState = { items: [] } as LeaderboardState;

const leaderboardSlice = createSlice({
	name: "ws/server/leaderboard",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(addItems, (state, action) => {
			// action is inferred correctly here if using TS
			state.items = action.payload.users;
		});
	},
});

export const { setItems } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
