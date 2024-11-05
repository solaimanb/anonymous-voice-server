import { AppointmentModel, IAppointment } from "./appointments.interfaces";
import { Schema, model } from "mongoose";

const AppointmentSlotSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
const AppointmentSchema = new Schema<IAppointment, AppointmentModel>(
  {
    appointmentType: {
      type: String,
    },
    status: {
      type: String,
    },

    selectedSlot: {
      type: [AppointmentSlotSchema],
    },
    mentorUserName: {
      type: String,
    },
    menteeUserName: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Appointment = model<IAppointment, AppointmentModel>(
  "Appointment",
  AppointmentSchema
);
