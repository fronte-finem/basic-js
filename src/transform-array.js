const CustomError = require("../extensions/custom-error");

const NOT_NEXT = '--discard-next';
const NOT_PREV = '--discard-prev';
const X2_NEXT = '--double-next';
const X2_PREV = '--double-prev';

const notDiscarded = (arr, i) => i >= 0 && i < arr.length && arr[i] !== NOT_NEXT;

module.exports = function transform(arr) {
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case (NOT_NEXT):
        i++;
        break;
      case (X2_NEXT):
        if (i+1 < arr.length) res.push(arr[i+1]);
        break;
      case (NOT_PREV):
        if (notDiscarded(arr, i-2)) res.pop();
        break;
      case (X2_PREV):
        if (notDiscarded(arr, i-2)) res.push(arr[i-1]);
        break;
      default:
        res.push(arr[i]);
    }
  }

  return res;
};
