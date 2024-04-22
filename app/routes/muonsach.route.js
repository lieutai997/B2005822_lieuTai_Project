const express = require("express");
const muon= require("../controllers/muonsach.controller");

const router = express.Router();
exports.router = router;

router
  .route("/")
  .get(muon.findAll)
  .post(muon.create)
  .delete(muon.deleteAll);


  router
  .route("/:id")
  .get(muon.findOne)
  .put(muon.update)
  .delete(muon.delete);


module.exports = router;
