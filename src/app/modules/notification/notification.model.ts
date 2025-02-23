import { Schema, model } from "mongoose";

import { INotification, NotificationModel } from "./notification.interfaces";

const NotificationSchema = new Schema<INotification, NotificationModel>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Notification = model<INotification, NotificationModel>(
  "Notification",
  NotificationSchema
);
