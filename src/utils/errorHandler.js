/**
 * Generic method for error handling
 *
 * @param {*} error
 * @param {*} req
 * @param {*} res
 */
const errorHandler = (error, req, res) => {
    if (error.status) res.status(error.status).json(error);
    else res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;