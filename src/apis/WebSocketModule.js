export default class WebSocketModule {
    constructor(url) {
        this.socket = new WebSocket(url);

        this.socket.addEventListener('open', this.onOpen);
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener('close', this.onClose);
        this.socket.addEventListener('error', this.onError);
    }

    onOpen(event) {
        // 연결이 열렸을 때 실행되는 코드
    }

    onMessage(event) {
        // 메시지를 수신했을 때 실행되는 코드
        const message = event.data; // 수신된 메시지
    }

    onClose(event) {
        // 연결이 닫혔을 때 실행되는 코드
    }

    onError(error) {
        // 오류가 발생했을 때 실행되는 코드
    }

    send(message) {
        this.socket.send(message);
    }
}
