const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    let deep = arr.filter(Array.isArray);
    if (deep.length == 0) return 1;
    return 1 + Math.max(...deep.map(this.calculateDepth.bind(this)));
  }
};
