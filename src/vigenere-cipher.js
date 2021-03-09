const CustomError = require("../extensions/custom-error");


const _A_ = 'A'.charCodeAt();
const LATIN_AMOUNT = 26;

const isString = (x) => typeof x == 'string' || x instanceof String;

const latinFiniteMonoid = (x, i) => String.fromCharCode((x.charCodeAt() + i - _A_) % LATIN_AMOUNT + _A_);

const LATIN = Array(LATIN_AMOUNT).fill('A').map(latinFiniteMonoid);

const toEncMap = (getVal, xs) => xs.reduce((o,x) => {o[x] = getVal(x); return o}, {});
const toDecMap = (getVal, xs) => xs.reduce((o,x) => {o[getVal(x)] = x; return o}, {});

const EncTabulaRecta = LATIN.reduce((acc, x, i) => {
  acc[x] = toEncMap(x => latinFiniteMonoid(x,i), LATIN);
  return acc
}, {});

const DecTabulaRecta = LATIN.reduce((acc, x, i) => {
  acc[x] = toDecMap(x => latinFiniteMonoid(x,i), LATIN);
  return acc
}, {});

function* repeat(xs) { while(true) for (let x of xs) yield x; }

class VigenereCipheringMachine {
  constructor(direct=true) {
    this.direct = direct;
  }

  encrypt(msg, key) {
    let res = this.enc(msg, key);
    return this.direct ? res.join('') : res.reverse().join('');
  }
  decrypt(msg, key) {
    let res = this.dec(msg, key);
    return this.direct ? res.join('') : res.reverse().join('');
  }

  enc(msg, key) { return this.process(msg, key, EncTabulaRecta); }
  dec(msg, key) { return this.process(msg, key, DecTabulaRecta); }

  process(msg, key, tabulaRecta) {
    this.validate(msg, key);
    msg = msg.toUpperCase();
    const genKey = repeat(key.toUpperCase());

    return msg.split('').map(x => x < 'A' || x > 'Z' ? x : tabulaRecta[genKey.next().value][x]);
  }

  validate(msg, key) {
    if (!isString(msg) || !isString(key)) throw new Error('Params must be string!');
  }
}

module.exports = VigenereCipheringMachine;
