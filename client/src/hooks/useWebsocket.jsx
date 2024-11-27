import { useEffect, useRef } from "react";

 const useWebsocket = (url, callback) => {
    //persist without creating new WebSocket connections.
    const ws = useRef(null);

    useEffect(() => {
         ws.current = new WebSocket(url);

         ws.current.onopen = () => {
            console.log("WebSocket connection opened");
        };

         ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        //Handle message event
        ws.current.onmessage = (event) => {
            callback && callback(JSON.parse(event.data));
        };

         ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        // Clean up
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url, callback]);
}

export default useWebsocket;