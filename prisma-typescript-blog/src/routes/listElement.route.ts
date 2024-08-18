import express = require("express");
import controller from "../controllers/listElement.controller";

const router = express.Router();

router.put("/:id", controller.editElement);

router.delete("/:id", controller.deleteElement);

router.get("/", controller.getElements);

router.post("/", controller.addElement);

export default router;