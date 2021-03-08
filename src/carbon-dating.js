const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(str) {
  if (typeof str != 'string') return false;
  const N = parseFloat(str);
  if (isNaN(N) || N <= 0 || N > MODERN_ACTIVITY) return false;
  const k = Math.log(2) / HALF_LIFE_PERIOD;
  return Math.ceil( Math.log(MODERN_ACTIVITY / N) / k );
};
