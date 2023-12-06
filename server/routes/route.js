const express = require("express");
const router = express.Router();
const routeController = require("../controllers/route.controller")
router.post("/create-payment-intent",routeController.createPaymentIntent)
router.post("/create-subscription",routeController.createSubcription);

module.exports = router