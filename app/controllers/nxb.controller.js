const ApiError = require("../api-error");
const MongDB = require("../utils/mongodb.util");
const NxbService = require("../services/nxb.service");
//const NxbService = require("../services/nxb.service");

exports.create = async (req, res, next) => {
  if (!req.body?.tennxb) {
    return next(new ApiError(400, "Name can not be empty!"));
  }

  try {
    const nxbService= new NxbService(MongDB.client);
    const document = await nxbService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact!")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nxbService = new NxbService(MongDB.client);
    const { name } = req.query;
    if (name) {
      documents = await nxbService.findByName(name);
    } else {
      documents = await nxbService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving contacts!")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const nxbService = new NxbService(MongDB.client);
    const document = await nxbService.findById(req.params.id);
    if (!document) return next(new ApiError(404, `Contact not found!`));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id: ${req.params.id}!`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty!"));
  }

  try {
    const nxbService = new NxbService(MongDB.client);
    const document = await nxbService.update(req.params.id, req.body);
    console.log(document);
    if (!document) return next(new ApiError(404, `Contact not found!`));
    return res.send({ message: "Contact was updated successfully!" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id: ${req.params.id}!`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const nxbService = new NxbService(MongDB.client);
    const document = nxbService.delete(req.params.id);
    if (!document) return next(new ApiError(404, `Contact not found!`));
    return res.send({ message: "Contact was deleted successfully!" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete contact with id: ${req.params.id}!`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const nxbService = new NxbService(MongDB.client);
    const deletedCount = await nxbService.deleteAll();
    return res.send({
      message: `${deletedCount}contacts were deleted successfully!`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all contacts!")
    );
  }
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const nxbService = new NxbService(MongDB.client);
    const documents = await nxbService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving favorite contacts!")
    );
  }
};
