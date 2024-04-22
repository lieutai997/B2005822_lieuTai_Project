const express = require("express");
const cors = require("cors");

const app = express();

//const contactRouter = require("./app/routes/contact.route");
const bookRouter = require("./app/routes/book.route");
const docgiaRouter = require("./app/routes/docgia.route");
const muonsachRouter = require("./app/routes/muonsach.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const nxbRouter= require("./app/routes/nxb.route");
const ApiError = require("./app/api-error");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

//app.use("/api/contacts", contactRouter);
app.use("/api/books",bookRouter);
app.use("/api/docgia",docgiaRouter);
app.use("/api/muon",muonsachRouter);
app.use("/api/nhanvien",nhanvienRouter);
app.use("/api/nhaxuatban",nxbRouter);

// handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal server Error" });
});

module.exports = app;
