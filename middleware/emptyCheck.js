const emptyFormCheck = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(500).json({ status: 204, success: false, message: 'No content!' });
    }

    return next(); // Move to the next middleware or route handler
};

module.exports = emptyFormCheck;
