const filter = require('../filter/index'),
    mysql = require('mysql'),
    bdd = require('../../utils/db/index'),
    model = require('../../model/views/index'),
    verif = require('../verif/index'),
    bcrypt = require('bcrypt'),
    status = require('../status')


module.exports = {
    verifloginpassword: async(email, password) => {
        if (filter.emailFormat(email) == false || filter.exist(password) == false) {
            return status.sendReturn(res, 401, { error: true, message: "L'email/password not correct", data: data })
        }
    },
    hashSecurity: async(result) => {
        // Encryptage du mot de passe
        const data = await new Promise(resolve => {
            bcrypt.genSalt(10, async(err, salt) => {
                return await bcrypt.hash(result, salt, (err, hash) => {
                    resolve(hash)
                });
            });
        })
        return data
    },
    passwordGenerator: async() => {
        return Math.random().toString(36).slice(-8);
    },
    login: async(table, where, array, res, message) => {
        bdd.mysql.query(model.select(table, where), array, (error, results, fields) => {
            if (error) {
                status.sendReturn(res, 400, { error: true, message: "Erreur dans la requête" });
            }
            // Si le resultat n'existe pas
            else if (results === undefined)
                status.sendReturn(res, 200, { error: false, message: "Aucun résultat pour la requête" });
            // Si la liste des utilises est vide
            else if (results.length == 0)
                status.sendReturn(res, 400, { error: true, message: "L'id envoyé n'existe pas" });
            // return du résultat de la requête
            else {
                status.sendReturn(res, 200, { error: false, result: { token: results[0].token, email: results[0].email, message: message } })
            }
        });
    }
}