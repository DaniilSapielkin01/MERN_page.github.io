//middleware - обычная функция позволяюзая перехватывать определенные данные и делать логику
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // bearer TOKEN как выглядит переда-мая строка
    if (!token) {
      return res.status(401).json({ message: "Нет авторизации ..." });
    }
    //если токен есть то нужно его расскодировать
    const decoder = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoder;
    next();
  } catch (e) {
    res.status(401).json({ message: "Нет авторизации ..." });
  }
};
