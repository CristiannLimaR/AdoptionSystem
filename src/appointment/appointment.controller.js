import Pet from "../pet/pet.model.js";
import User from "../users/user.model.js";
import Apointment from "./appointment.model.js";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    const pet = await Pet.findOne({ name: data.pet });
    console.log(user)
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Owner not found",
      });
    }

    if (!pet) {
      return res.status(404).json({
        success: false,
        msg: "Pet not found",
      });
    }

    const appointment = new Apointment({
      ...data,
      owner: user._id,
      pet: pet._id,
    });

    await appointment.save();

    res.status(200).json({
        success: true,
        appointment
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
        success: false,
        msg: "Error saving appointment",
        error,
    });
  }
};

export const getAppointments = async (req, res) => {
    const { limit = 10, offset = 0 } = req.body;
    const query = { status: true };
  
    try {
      const appointments = await Apointment.find(query)
        .skip(Number(offset))
        .limit(Number(limit));
  
      const AppointmentsWithNames = await Promise.all(
        appointments.map(async (appointment) => {
          const owner = await User.findById(appointment.owner);
          const pet = await Pet.findById(appointment.pet);
          return {
            ...appointment.toObject(),
            owner: owner ? owner.name : "Owner not found",
            pet: pet ? pet.name : "Pet not found"
          };
        })
      );
  
      const total = await Apointment.countDocuments(query);
  
      res.status(200).json({
        success: true,
        total,
        appointments: AppointmentsWithNames
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Error showing appointments",
        error,
      });
    }
  };
