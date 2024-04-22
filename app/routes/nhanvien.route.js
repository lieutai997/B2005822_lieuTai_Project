const express = require("express");
const nhan = require("../controllers/nhanvien.controller");

const router = express.Router();

router
  .route("/")
  .get(nhan.findAll)
  .post(nhan.create)
  .delete(nhan.deleteAll);


router
  .route("/:id")
  .get(nhan.findOne)
  .put(nhan.update)
  .delete(nhan.delete);

module.exports = router;
