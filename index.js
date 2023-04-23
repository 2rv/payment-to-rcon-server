const { Rcon } = require("rcon-client");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Налаштування парсера JSON-даних в тілі запиту
app.use(bodyParser.json());

// Параметри підключення до сервера Minecraft
const rconOptions = {
  host: "localhost",
  port: 25575,
  password: "mysecretpassword"
};


let rconClient;

// Підключення до rcon при запуску сервера
Rcon
  .connect(rconOptions)
  .then((client) => {
    console.log("Connected to RCON");
    rconClient = client;
  })
  .catch((error) => {
    console.error(`Failed to connect to RCON: ${error.message}`);
    process.exit(1);
  });

// Ендпоїнт для обробки даних донату
app.post("/donate", (req, res) => {
  console.log('new donate');

  const data = req.body;
  
  const {
    pubId,
    clientName,
    message,
    amount,
    currency,
    source,
    goal,
    isPublished,
    createdAt
  } = data;

  // Виконання команди rcon з параметрами з тіла запиту
  rconClient.send(`say Донат від ${clientName}: ${message}`);

  // Відправлення відповіді на запит
  res.json({ success: true });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});