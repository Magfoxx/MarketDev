import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Base de données connectée : ${process.env.NODE_ENV === "production" ? "MongoDB Atlas" : "Local"}`);
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

export default connectDB;