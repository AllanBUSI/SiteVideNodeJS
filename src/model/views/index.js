module.exports = {
    insert: (table) => {
        return "INSERT INTO " + table + "  SET ? "
    },
    select: (table, data) => {
        return "SELECT * FROM " + table + " WHERE " + data + " = ?"
    },
    update: (table, results) => {
        return "UPDATE " + table + " SET ? WHERE '" + results + "'"
    }
}