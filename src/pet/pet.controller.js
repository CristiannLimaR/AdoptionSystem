import User from "../users/user.model.js";
import Pet from "./pet.model.js";

export const savePet = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Owner not found",
      });
    }

    const pet = new Pet({
      ...data,
      keeper: user._id,
    });

    await pet.save();

    res.status(200).json({
      success: true,
      pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error saving pet",
      error,
    });
  }
};

export const getPets = async (req, res) => {
  const { limit = 10, offset = 0 } = req.body;
  const query = { status: true };

  try {
    const pets = await Pet.find(query)
      .skip(Number(offset))
      .limit(Number(limit));

    const petWithOwnerNames = await Promise.all(
      pets.map(async (pet) => {
        const owner = await User.findById(pet.keeper);
        return {
          ...pet.toObject(),
          keeper: owner ? owner.name : "Owner not found",
        };
      })
    );

    const total = await Pet.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      pets: petWithOwnerNames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error showing pets",
      error,
    });
  }
};

export const searchPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({
        success: false,
        msg: "Pet not found",
      });
    }

    const owner = await User.findById(pet.keeper);

    res.status(200).json({
      success: true,
      pet: {
        ...pet.toObject(),
        keeper: owner ? owner.name : "Owner not found",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error when searching for pet",
      error,
    });
  }
};

export const deletePet = async (req, res) => {
  const { id } = req.params;

  try {
    await Pet.findByIdAndUpdate(id, { status: false });
    res.status(200).json({
      success: true,
      msg: "Pet successfully removed ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error when deleting",
      error,
    });
  }
};

export const updatePet = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, ...data } = req.body;
    const user = await User.findOne({ email: data.email });
    data.keeper = user._id
    const pet = await Pet.findByIdAndUpdate(id, data, { new: true });

    if (!pet) {
      return res.status(404).json({
        success: false,
        msg: "Pet not found",
      });
    }

    if (!user) {
        return res.status(404).json({
          success: false,
          msg: "Owner not found",
        });
      }

    res.status(200).json({
      success: true,
      msg: "Pet successfully update",
      pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "error updating pet",
      error,
    });
  }
};