const router = require("express").Router();
const { showList, showDetails } = require("../controllers/task4Controller");

router.get("/", showList);

router.get("/:zodiac", showDetails);

module.exports = router;