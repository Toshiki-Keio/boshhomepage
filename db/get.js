exports.getRow = function(sql) {
    let sqlite = require("sqlite3").verbose();
    let db = new sqlite.Database(bosh_homepage_db);

    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            resolve(row);
        });
    });
}