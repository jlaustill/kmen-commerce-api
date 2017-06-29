const router = require("express").Router(),
    package = require(__appRoot + "/package.json");

router.get("/", (req, res) => {
    res.json({"request": "successful", "version": package.version, "environment": process.env.description});
});

module.exports = router;
