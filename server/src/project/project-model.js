import { BaseSchema, model } from "../db.js";
import { registerNotificationEvents } from "../notify.js";

// name
const modelName = "Project";

// project schema
const schema = BaseSchema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

// notification middleware
registerNotificationEvents(modelName, schema);

// model
export const Project = model(modelName, schema);
