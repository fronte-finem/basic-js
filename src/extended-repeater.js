const CustomError = require("../extensions/custom-error");

const DEFAULT_SEPARATOR_LVL_1 = '+';
const DEFAULT_SEPARATOR_LVL_2 = '|';

module.exports = function repeater(str, options) {
  if (options.addition !== undefined) {
    str += repeat(options.addition
                , options.additionRepeatTimes || 0
                , options.additionSeparator || DEFAULT_SEPARATOR_LVL_2);
  }
  return repeat(str
              , options.repeatTimes || 0
              , options.separator || DEFAULT_SEPARATOR_LVL_1);
};

function repeat(any, times, sep) {
  str = String(any);
  let res = [str];
  for (let i=1; i < times; i++) {
    res.push(sep);
    res.push(str)
  }
  return res.join('');
};
