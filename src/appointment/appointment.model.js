import { Schema, model } from "mongoose";

const AppointmentSchema = Schema(
  {
    date: {
      type: Date,
      required: [true, "the date is required"],
    },
    time: {
      type: String,
      required: [true, "the time is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "pet",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false, 
  }
);

export default model('Appointment', AppointmentSchema);
