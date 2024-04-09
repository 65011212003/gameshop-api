import express from "express";

const app = express();

const port = 3000;

app
    .get("/", (req, res) => {
        res.send({
            message: "Hello, World!",
        });
    })
    .get("/random", (req, res) => {
        res.send({
            number: Math.floor(Math.random() * 100),
        });
    });

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});