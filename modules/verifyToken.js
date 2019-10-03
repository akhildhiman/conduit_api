var jwt = require("jsonwebtoken");


// Verifying token. 
exports.verifyToken = function(req, res, next) {
    var token = req.headers.authorization || "";
    if (token) {
        jwt.verify(token, "secret", function(err, decoded) {
            console.log("inside verify token");
            if (err) return res.json(err);
            req.userId = decoded.userId; //decoding the userId
            console.log(req.userId);
            next();
        })
    }
    else {
        res.json({message: "User is not logged in"});
    }
}


