import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Spinner from './components/spinner/Spinner'
import { SpinnerSize } from './components/spinner/constants'

const WebSocketContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const WebSocketProvider = ({ url, children }) => {
  const ws = useRef(null);
  const callbacks = useRef([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize WebSocket
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
      setIsConnected(true);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle incoming messages
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Call each registered callback with the incoming message
      callbacks.current.forEach((callback) => callback(message));
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(true);
    };

    // Clean up on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  // Register a callback function to handle messages
  const registerCallback = (callback) => {
    callbacks.current.push(callback);
    return () => {
      callbacks.current = callbacks.current.filter((cb) => cb !== callback);
    };
  };

  if (!isConnected) {
    return <Spinner size={SpinnerSize.LARGE}/>
  }

  return (
    <WebSocketContext.Provider value={{ registerCallback }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
