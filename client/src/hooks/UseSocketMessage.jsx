import { useEffect } from 'react';
import { useWebSocket } from '../WebSocketContext'

/**
 * Custom hook to register a WebSocket message handler for a specific event model.
 *
 * @param {string} eventModel - The model of the event to listen for.
 * @param {Object} handler - An object containing callback functions for different message types.
 */
const useSocketMessage = (eventModel, handler = null) => {
  const { registerCallback } = useWebSocket();

  useEffect(() => {
    const handleSocketMessage = (message) => {
      const { type, model, data } = message;
      if (!type || !model || !data) {
        console.error('Invalid message structure:', message);
        return;
      }

      if (model === eventModel && handler[type]) {
        handler[type](data);
      } else {
        console.warn('Unhandled model or type:', model, type);
      }
    };
    const unregister = registerCallback(handleSocketMessage);

    // Unregister the callback when the component unmounts
    return () => unregister();
  }, [registerCallback]);
};

export default useSocketMessage;

