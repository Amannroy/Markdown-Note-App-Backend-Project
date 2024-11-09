import mongoose from "mongoose"

const CONNECTION_URL = "mongodb+srv://markdown-note-app:markdown-note-app123@markdown-note-app.kge36.mongodb.net/?retryWrites=true&w=majority&appName=markdown-note-app"

const connectDB = async() => {
    try{
      await mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log("Connected to MongoDB");
      
    }catch(error){
      console.error("Database connection error:", error);
      process.exit(1);
    }
}

export default connectDB;
