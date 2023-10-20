class Socket {
	socket: WebSocket | null;

	constructor() {
		this.socket = null;
	}

	connect(url: URL) {
		if (!this.socket) {
			this.socket = new WebSocket(url);
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}

	send(message: unknown) {
		if (this.socket) {
			this.socket.send(JSON.stringify(message));
		}
	}

	on(eventName: string, callback: (...args: unknown[]) => void) {
		if (this.socket) {
			this.socket.addEventListener(eventName, callback);
		}
	}
}

export default Socket;
