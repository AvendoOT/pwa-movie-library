const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
    console.log(`HTTP listening on port: ${port}`);
});

