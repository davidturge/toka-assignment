import { server } from "./server.js";
import { changeTypes, modelEvents } from "./constants.js";

// add mongo schema middleware
// and broadcast notifications on change
export const registerNotificationEvents = (modelName, schema) => {
  schema
    .post(modelEvents.SAVE, (data) =>
      server.broadcast({
        type: changeTypes.INSERT,
        model: modelName,
        data,
      })
    )
    .post(modelEvents.UPDATE, (data) =>
      server.broadcast({
        type: changeTypes.UPDATE,
        model: modelName,
        data,
      })
    )
    .post(modelEvents.DELETE, (data) =>
      server.broadcast({
        type: changeTypes.DELETE,
        model: modelName,
        data,
      })
    );
};
