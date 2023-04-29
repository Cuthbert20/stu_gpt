const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
//Middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));