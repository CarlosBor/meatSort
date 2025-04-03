require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// 1- Login
// 2- Gen Api Key
// 3- Request API
// 4- Make queries reach the backend
// 5- Responses

console.log("Database URL:", process.env.DATABASE_URL);

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
