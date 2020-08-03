const mysql = require('mysql'),
    bdd = require('./../../utils/db/index'),
    model = require('../../model/views/index')


module.exports = {
    vide: async(data) => {
        if (data == undefined || data.trim().length == 0)
            return false
        else
            return true
    },
    emailExiste: async(table, data) => {
        let toReturn = false
        toReturn = await new Promise(resolve => {
            bdd.mysql.query(model.select(table, "email"), data, (error, results) => {
                resolve((results.length > 0) ? true : false)
            })
        })
        return toReturn
    }
}