const bodyValidation = (yupValidator) => {

    return async (req, res, next) => {
        try {
            const validData = await yupValidator.noUnknown().validate(req.body, {abortEarly : false});
            req.body = validData;
            next();
        }
        catch(e) {
            console.log(e);
            // return res.sendStatus(400); //bad request
            return res.status(400).json({err : `${[e]}}`}); //bad request
        }

    }
}

module.exports = bodyValidation;