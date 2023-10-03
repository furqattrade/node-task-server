const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const AppError = require("./appError");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const validPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genPassword = async (password) => {
  const saltRound = 11;
  const hash = await bcrypt
    .hash(password, saltRound)
    .then((hash) => hash)
    .catch(
      () => new AppError("Something went wrong, please try again later", 500)
    );

  return hash;
};

const issueJWT = (user) => {
  const _id = user._id;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "3d",
  });

  return "Bearer " + signedToken;
};

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
};
