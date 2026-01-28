const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

 
app.get("/api/tasks", (req, res) => {
  const data = fs.readFileSync("tasks.json", "utf-8");
  res.json(JSON.parse(data));
});

 
app.post("/api/tasks", (req, res) => {
  const { task } = req.body;

  const tasks = JSON.parse(fs.readFileSync("tasks.json"));
  tasks.push(task);

  fs.writeFileSync("tasks.json", JSON.stringify(tasks));

  res.json({ message: "Task Added" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});