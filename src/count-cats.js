const CustomError = require("../extensions/custom-error");

module.exports = function countCats(xss) {
  return xss.reduce((acc, xs) => acc + xs.filter(x => x == '^^').length, 0);
};
