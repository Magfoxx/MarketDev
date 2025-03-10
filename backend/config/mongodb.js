import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Base de données connectée");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

export default connectDB;