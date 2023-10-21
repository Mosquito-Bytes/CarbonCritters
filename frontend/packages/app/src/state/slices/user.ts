import { createSlice, createAction } from "@reduxjs/toolkit";
import { Score } from "./leaderboard";

export type Critter = {
	name: string;
	id: number;
};

export type User = {
	userId: number;
	name: string;
	score: Score;
	critter: Critter;
};

const getUser = createAction<User>("ws/server/user");

type UserState = User;

const initialState = {
	userId: 0,
	name: "",
	score: { total: 0, diff: 0 },
	critter: { name: "", id: 0 },
} as UserState;

const userSlice = createSlice({
	name: "ws/server/user",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getUser, (state, action) => {
			state.name = action.payload.name;
			state.userId = action.payload.userId;
			state.score = action.payload.score;
			state.critter = action.payload.critter;
		});
	},
});

export default userSlice.reducer;
