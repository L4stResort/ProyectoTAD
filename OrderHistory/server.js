const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT || 9004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/userHistory", require("./routes/userHistoryRouter"));

app.listen(port, () => {
    console.log(`UserHistory service running on port ${port}`);
});