
//Vérifie si le contenu n'est pas vide
module.exports = (req, res, next) => {

    if (JSON.stringify(req.body) !== '{}') {
        console.log(req.body)
        next();
    }
    else {
        res.status(401).json({message: 'Contenu body vide !'})
    }
};