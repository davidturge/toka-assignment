
import { useEffect } from 'react';
import { useWebSocket } from '../WebSocketContext'

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

