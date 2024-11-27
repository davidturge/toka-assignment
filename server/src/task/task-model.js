import { taskStates } from "../constants.js";
import { BaseSchema, model, ObjectId } from "../db.js";
import { registerNotificationEvents } from "../notify.js";

// name
const modelName = "Task";

// project schema
const schema = BaseSchema({
  state: {
    type: String,
    enum: Object.values(taskStates),
    default: taskStates.CREATED,
  },
  projectId: {
    type: ObjectId,
    ref: "Project",
    required: true,
    index: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
});

// notification middleware
registerNotificationEvents(modelName, schema);

// model
export const Task = model(modelName, schema);
