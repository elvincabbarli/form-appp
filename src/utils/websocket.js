// websocket.js

let socket = null;

export const connectWebSocket = (userId, onMessageReceived) => {
    if (!socket) {
        socket = new WebSocket(`ws://195.35.56.202:8080/ws/notifications/${userId}`);

        socket.onopen = function(event) {
            console.log(event)
            console.log("WebSocket connected");
        };

        socket.onmessage = function(event) {
            const notification = JSON.parse(event.data);
            console.log("Received notification:", notification);
            onMessageReceived(notification);
        };

        socket.onclose = function(event) {
            console.log(event)
            console.log("WebSocket closed");
            socket = null; // Reset socket when closed
        };
    }
};

export const closeWebSocket = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
};

export const sendWebSocketMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
};
