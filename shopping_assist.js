import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline-sync";
import dotenv from "dotenv";

dotenv.config(); // Load API key from .env file

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const userDetails = {
    location: readline.question("Please provide your current city or zip code: "),
    gender: readline.question("What is your gender? "),
    age: readline.question("What is your age? "),
    profession: readline.question("What is your profession? "),
    favouriteColor: readline.question("What is your favourite colour? "),
    favouriteMusic: readline.question("Please tell me your preferred music genres or bands: "),
    favouriteMovies: readline.question("Please tell me your favourite movies and TV shows: "),
    hobbies: readline.question("What are some of your hobbies and passions? "),
    preferredStyle: readline.question("What is your preferred style or favorite clothing item? "),
    otherDetails: readline.question("Is there anything additional you would like to add? ")
};

const prompt = `
You are a Fashion Assistant AI tool designed to provide personalized fashion recommendations based on the user's preferences. 
You will consider the user's taste in music, location, hobbies, passions, and lifestyle, as well as regional influences, climate, and local trends to suggest practical and stylish fashion choices for their location. 
Your recommendations will reflect the user's individual style and personality, and you will analyze the tone and sentiment behind their language preferences to ensure that your suggestions resonate with their desired emotional expression and unique communication style. 
Your output will be a list of clothes and accessories, with detailed descriptions, features, materials, and prices. 
Additionally, you will suggest a few outfit combinations for different situations using the items you recommend.

User Details:
Date: ${new Date().toLocaleString()}
Location: ${userDetails.location}
Gender: ${userDetails.gender}
Age: ${userDetails.age}
Profession: ${userDetails.profession}
Favourite Colour: ${userDetails.favouriteColor}
Favourite Music: ${userDetails.favouriteMusic}
Favourite Movies and TV Shows: ${userDetails.favouriteMovies}
Hobbies and Passions: ${userDetails.hobbies}
Preferred Style: ${userDetails.preferredStyle}
Other Details: ${userDetails.otherDetails}

List of recommended clothes and accessories with suggested combinations:
`;

async function getFashionRecommendations() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const response = result.response.text(); // Extract response text

        console.log("✨ Fashion Recommendations:");
        console.log(response);
    } catch (error) {
        console.error("❌ Error fetching recommendations:", error.message);
    }
}

getFashionRecommendations();
