const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
const cors = require("cors");
const app = express();
const PORT = 3000;

// Read JSON file and parse data
const filePath = "data.json"; // Replace with your file path
let jsonData = [];
const baseUrl = "http://localhost:4200";
try {
  const fileContent = fs.readFileSync(filePath, "utf8");
  jsonData = JSON.parse(fileContent);
} catch (error) {
  console.error("Error reading or parsing JSON file:", error);
}

// Middleware to parse JSON in POST requests
app.use(bodyParser.json());
app.use(cors());

//method for list data
app.get("/api/data", (req, res) => {
  res.set("Access-Control-Allow-Origin", baseUrl);
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// Endpoint to get data by ID
app.get("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.set("Access-Control-Allow-Origin", baseUrl);
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const items = JSON.parse(data);
    const item = items.find((item) => item.id === id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  });
});

// Add data method route
app.post("/addData", (req, res) => {
  res.set("Access-Control-Allow-Origin", baseUrl);
  try {
    // Read existing data from JSON file
    const rawData = fs.readFileSync("data.json");
    const data = JSON.parse(rawData);

    let request = req.body;

    // Calculate next available ID
    let maxId = 0;
    for (const node of jsonData) {
      if (node.id > maxId) {
        maxId = node.id;
      }
    }
    const newId = maxId + 1;
    Object.assign(request, { id: newId });
    // Add new data from the request body to the data array
    data.push(request);

    // Write updated data back to JSON file
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.status(200).json({ message: "Data added successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.use(express.json());

// Read JSON data from file
const readDataFromFile = () => {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};

// Write JSON data to file
const writeDataToFile = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

// Update data by ID
app.put("/api/update/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", baseUrl);
  const idToUpdate = parseInt(req.params.id);
  const newData = req.body;

  const currentData = readDataFromFile();
  const updatedData = currentData.map((item) => {
    if (item.id === idToUpdate) {
      return { ...item, ...newData };
    }
    return item;
  });

  writeDataToFile(updatedData);

  res.json(updatedData);
});


// search data by title
app.get('/search', (req, res) => {
  const searchQuery = req.query.q; // Get the search query from the URL parameter

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query parameter is required' });
  }

  const searchResults = jsonData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  res.json(searchResults);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/image', (req, res) => {
  const imagePath = path.join(__dirname, '../src/assets/images/'+req.image); // Update with your image path
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading image file' });
      return;
    }

    const base64Image = Buffer.from(data).toString('base64');
    res.json({ image: base64Image });
  });
});
