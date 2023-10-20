import { Action, Dispatch } from "@reduxjs/toolkit";
import Socket from "../../util/websocket";

const CarbonCritterSocketUrl = new URL("ws://localhost:8080");

export const websocketMiddleware =
	(websocket: Socket) =>
	(params: { dispatch: Dispatch<Action>; getState: () => unknown }) =>
	(next: (action: Action) => void) =>
	(action: Action) => {
		const { dispatch, getState } = params;
		const { type } = action;

		switch (type) {
			case "websocket/connect":
				websocket.connect(CarbonCritterSocketUrl);

				websocket.on("open", () => {});
				websocket.on("message", (data: unknown) => {
					console.log(data);
				});
				websocket.on("close", () => {});
				break;

			case "websocket/disconnect":
				websocket.disconnect();
				break;

			default:
				break;
		}

		return next(action);
	};

export default websocketMiddleware;
