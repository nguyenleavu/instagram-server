const checkField = async (error, req, res, next) => {
    const message = `This is  the unexpected field => ${error.field}`;
    return res.status(500).send(message);
};

module.exports = checkField;
