function errorHandler(err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err);

    // Get the status code from the error or default to 500
    const statusCode = err.statusCode || 500;

    // Get the error message from the error or default to 'Something went wrong'
    const errorMessage = err.message || 'Something went wrong';

    // Send the response with the status code and error message
    res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;