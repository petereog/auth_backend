const bcrypt = require("bcryptjs")
const { createHmac } = require('crypto');

async function dohash(value, saltvalue) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(value, saltvalue, (err, hashed) => {
            if (err) return reject(err);
            resolve(hashed);
        });
    });
}

function dohashValidation(value, hashed) {
    return bcrypt.compareSync(value, hashed);
}

function hmacprocess(value, key) {
    return createHmac('sha256', key).update(value).digest('hex');
}

module.exports = { dohash, dohashValidation, hmacprocess };