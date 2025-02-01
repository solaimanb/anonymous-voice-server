import { Schema, model } from "mongoose";

import { IMentorSchedule, MentorScheduleModel } from "./mentor.interface";

const MentorScheduleSchema = new Schema<IMentorSchedule, MentorScheduleModel>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: {
      type: [
        {
          day: String,
          startTime: { hours: Number, minutes: Number },
          endTime: { hours: Number, minutes: Number },
          isAvailable: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const MentorSchedule = model<IMentorSchedule, MentorScheduleModel>(
  "MentorSchedule",
  MentorScheduleSchema
);
