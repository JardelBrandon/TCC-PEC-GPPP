const validateBody = (req, res, next) => {
    const {body} = req;

    if(body.name === undefined) {
        return res.status(400).json({message: "The field [title] is required"});
    }

    if(body.name === '') {
        return res.status(400).json({message: "[title] cannot be empty"});
    }

    next();
};

module.exports = {
    validateBody
}
