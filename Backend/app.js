const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Define the search route
app.post("/search", async (req, res) => {
  try {
    const { search } = req.body;
    if (!search) return res.status(400).json({ error: "Search input required" });

    console.log("Received search query:", search);

    // Simulating the `query()` function with an external request (adjust URL accordingly)
    const agentResponse = await axios.post(
      "https://example.com/query", // Replace with the actual agent API URL
      { value: search }
    );

    // Processed response
    const processedResult = `You entered: ${search}`;
    res.json({ message: processedResult, agentResponse: agentResponse.data });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
