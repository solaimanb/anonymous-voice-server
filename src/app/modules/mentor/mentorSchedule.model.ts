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
          day: { type: String, required: true },
          startTime: {
            type: {
              hours: { type: Number, required: true },
              minutes: { type: Number, required: true },
            },
          },
          endTime: {
            type: {
              hours: { type: Number, required: true },
              minutes: { type: Number, required: true },
            },
          },
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
