// init code
const jwt = require('jsonwebtoken');
const token_key = process.env.TOKEN_KEY;
const usermodel = require('./../dbmodel/usermodel');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    // check token
    if (!token) {
        res.json({
            status: false,
            message: 'Token not Provided'
        });
    }
    //token varification
    jwt.verify(token, token_key, (error, decoded) => {
        if (error) {
            res.json({
                status: false,
                message: 'Fail to varify token.',
                error: error
            });
        }
        //OK
        usermodel.findById(
            decoded.id, (error, result) => {
                // check db error
                if (error) {
                    res.json({
                        status: false,
                        message: 'fail to read from database',
                        error: error
                    });
                }
                if (!result) {
                    res.json({
                        status: false,
                        message: 'user don\'t exist. Invalid ID',
                    });
                }
                //output final result
                req.userId = result._id;
                next();
            }
        );
    });
};

// export module
module.exports = verifyToken;