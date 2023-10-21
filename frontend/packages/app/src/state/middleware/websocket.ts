import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Socket from "../../util/websocket";

export const websocketMiddleware =
	(websocket: Socket) =>
	(params: {
		dispatch: Dispatch<PayloadAction<unknown>>;
		getState: () => unknown;
	}) =>
	(next: (action: PayloadAction<unknown>) => void) =>
	(action: PayloadAction<unknown>) => {
		const { dispatch } = params;
		const { type, payload } = action;

		switch (type) {
			case "ws/client/connect":
				websocket.connect(new URL(payload as URL));

				websocket.on("open", () => {
					console.log("socket opened");
				});
				websocket.on("message", (event) => {
					dispatch(JSON.parse((event as MessageEvent).data));
				});
				websocket.on("close", () => {
					console.log("socket closed");
				});
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
