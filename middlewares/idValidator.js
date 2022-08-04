const  mongoose  = require("mongoose");

const idValidator = () => {
return (req, res, next) => {
    const id = req.params.id;
    if( !mongoose.isValidObjectId(id))
    {
        res.status(400).json({erreur : "ID non Valide !!!"});
        return;
    }
    next();
}
}

module.exports = idValidator;