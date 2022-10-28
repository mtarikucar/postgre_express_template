const bcrypt = require("bcrypt");

const hash_password = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verify_password = (password, hashed_password) => {
  return bcrypt.compareSync(password, hashed_password);
};

module.exports = {
  hash_password,
  verify_password,
};