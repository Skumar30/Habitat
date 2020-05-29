var express = require('express');
var router = express.Router();

router.post('/changePassword', (req, res, next) => {
    var User = require('../models/user');
    if (req.body.old_password !== req.user.password) {
        res.json({ message: "Old password does not match\nexisting password" })
    }
    else if (req.body.old_password === req.body.password) {
        res.json({ message: "New password cannot be the \nsame as old password" })
    }
    else {
        User.findByIdAndUpdate(
            req.user._id,
            { password: req.body.password },
            (err, user) => {
                if (err) {
                    res.json({ message: "Error occurred while changing password" })
                }
                res.json({ password: user.password })
            })
    }
});

module.exports = router;