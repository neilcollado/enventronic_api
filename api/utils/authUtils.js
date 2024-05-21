// Imports
const bcrypt = require("bcrypt");

// Middleware
const { genSaltSync, hashSync, compareSync } = bcrypt;

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
function hashPassword(password) {
    const salt = genSaltSync();
    return hashSync(password, salt);
}

/**
 * Compares a raw password with a hashed password.
 * @param {string} raw - The raw password.
 * @param {string} hash - The hashed password.
 * @returns {boolean} True if the passwords match, false otherwise.
 */
function comparePassword(raw, hash) {
    return compareSync(raw, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
}