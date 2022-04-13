import jwt from "jsonwebtoken";
import  jwt_decode from "jwt-decode";
const { verify } = jwt;

function authenticate(req, res, next) {
  const token = req.header("Authorization")?.trim();
  if (!token)
    return res.status(401).send("Access Denied! You need to login first as an admin");
  try {
    const TokenArray = token.split(" ");

    let decoded = jwt_decode(TokenArray[1]);
    if(decoded.role === "admin") {
        let user = verify(TokenArray[1], process.env.JWT.trim());
        req.user = user;
        next();
    }else {
    return res.status(401).send("Access Denied! You need to login first as an admin");
    }
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
}

export default authenticate;
