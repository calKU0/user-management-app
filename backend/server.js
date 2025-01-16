require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Połączono z MongoDB"))
  .catch((err) => console.log("Błąd połączenia z MongoDB:", err));

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  gender: {
    type: String,
    enum: ["Mężczyzna", "Kobieta"],
    default: "Mężczyzna",
  },
  active: { type: Boolean, default: false },
  comment: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Błąd podczas pobierania użytkowników", error: err });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, active, comment } =
      req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      gender,
      active,
      comment,
    });

    await newUser.save();
    res.status(201).send({ message: "Użytkownik dodany", user: newUser });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Błąd podczas dodawania użytkownika", error: err });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, active, comment } =
      req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, password, gender, active, comment },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "Użytkownik nie znaleziony" });
    }

    res
      .status(200)
      .send({ message: "Dane użytkownika zaktualizowane", user: updatedUser });
  } catch (err) {
    res.status(400).send({
      message: "Błąd podczas edytowania danych użytkownika",
      error: err,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
