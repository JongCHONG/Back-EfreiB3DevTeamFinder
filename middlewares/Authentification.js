import jwt from "jsonwebtoken";

// Middleware pour vérifier le jeton d'accès dans chaque requête
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};
