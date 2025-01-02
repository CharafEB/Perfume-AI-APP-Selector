const { Router } = require('express');
const router = Router();

router.get("/test", (req, res) => {
    res.render("index");
});

module.exports = router;