import { Action, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Socket from "../../util/websocket";

const CarbonCritterSocketUrl = new URL("ws://localhost:8080");

export const websocketMiddleware =
	(websocket: Socket) =>
	(params: {
		dispatch: Dispatch<PayloadAction<unknown>>;
		getState: () => unknown;
	}) =>
	(next: (action: PayloadAction<unknown>) => void) =>
	(action: PayloadAction<unknown>) => {
		const { dispatch, getState } = params;
		const { type } = action;

		switch (type) {
			case "ws/client/connect":
				websocket.connect(CarbonCritterSocketUrl);

				websocket.on("open", () => {});
				websocket.on("message", (event) => {
					console.log("message received: ", event);
					dispatch(JSON.parse((event as MessageEvent).data));
				});
				websocket.on("close", () => {});
				break;

			case "ws/client/disconnect":
				websocket.disconnect();
				break;

			case "ws/client/send":
				if (action.payload) {
					websocket.send(action.payload);
				}
				break;

			default:
				break;
		}

		return next(action);
	};

export default websocketMiddleware;
