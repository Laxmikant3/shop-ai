require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const AGENT_ADDRESS = "agent1qw76h6w8ns93rqa6ye5hyd4xj0k97nl2fk9xepes0dayqhr8c57qw45nye0";

// Handle incoming queries
app.post("/query", async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ error: "Missing query value" });
    }

    console.log("Received query message:", value);

    // Send request to another agent
    const response = await axios.post("http://127.0.0.1:8001/submit", {
      value,
    });

    console.log("Response from agent:", response.data);

    res.json({ success: true, agent_response: response.data });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Query failed", details: error.message });
  }
});

// Start server
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Agent running on http://localhost:${PORT}`);
});
