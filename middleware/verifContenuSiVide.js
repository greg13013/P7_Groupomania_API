
//Vérifie si le contenu n'est pas vide
module.exports = (req, res, next) => {
console.log(req.body);
    if (JSON.stringify(req.body) !== '{}') {
        console.log(req.body)
        next();
    }
    else {
        res.status(400).json({message: 'Contenu body vide !'})
    }
};