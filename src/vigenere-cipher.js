const CustomError = require("../extensions/custom-error");

const isString = (x) => typeof x == "string" || x instanceof String;

const _A_ = "A".charCodeAt();
const LATIN_AMOUNT = 26;

const getLatChar = (i) => String.fromCharCode(_A_ + (i % LATIN_AMOUNT));

const genTabulaRecta = (update) => {
  let out = {};
  for (let i = 0; i < LATIN_AMOUNT; i++) {
    let key = getLatChar(i);
    let inn = {};
    for (let j = 0; j < LATIN_AMOUNT; j++) {
      update(inn, getLatChar(i + j), getLatChar(j));
    }
    out[key] = inn;
  }
  return out;
};

const EncTabulaRecta = genTabulaRecta((obj, a, b) => { obj[b] = a; return obj; });
const DecTabulaRecta = genTabulaRecta((obj, a, b) => { obj[a] = b; return obj; });

function* repeat(xs) {
  while (true) for (let x of xs) yield x;
}

class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(msg, key) { return this.process(msg, key, EncTabulaRecta); }
  decrypt(msg, key) { return this.process(msg, key, DecTabulaRecta); }

  process(msg, key, tabulaRecta) {
    this.validate(msg, key);
    msg = msg.toUpperCase();
    const genKey = repeat(key.toUpperCase());

    let res = msg
      .split("")
      .map((x) => x < "A" || x > "Z" ? x : tabulaRecta[genKey.next().value][x]);

    return this.direct ? res.join("") : res.reverse().join("");
  }

  validate(msg, key) {
    if (!isString(msg) || !isString(key))
      throw new Error("Params must be string!");
  }
}

module.exports = VigenereCipheringMachine;
