const validator = require('validatorjs');

const registerValidation = (req, res, next) => {
    const validateRule = {
        email: 'required|email',
        code: 'required|string'
    };

    const validation = new validator(req.body, validateRule);

    if (validation.fails()) {
        const errors = validation.errors.all();
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
};



const loginValidation = (req, res, next) => {
    const validateRule = {
        email: 'required|email',
        password: 'required|min:2'
    };

    const validation = new validator(req.body, validateRule);

    if (validation.fails()) {
        const errors = validation.errors.all();
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
};


module.exports = {
    registerValidation,
    loginValidation
};