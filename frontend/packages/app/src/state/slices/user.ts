import { createSlice, createAction } from "@reduxjs/toolkit";
import { Score } from "./leaderboard";

export type User = {
	userId: number;
	name: string;
	score: Score;
};

const getUser = createAction<User>("ws/server/user");

const requestUser = createAction<User["userId"]>("ws/server/user");

type UserState = User;

const initialState = {
	userId: 0,
	name: "",
	score: { total: 0, diff: 0 },
} as UserState;

const userSlice = createSlice({
	name: "ws/server/user",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getUser, (state, action) => {
			// action is inferred correctly here if using TS
			state.name = action.payload.name;
			state.userId = action.payload.userId;
			state.score = action.payload.score;
		});
	},
});

export default userSlice.reducer;
