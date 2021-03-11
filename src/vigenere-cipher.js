const CustomError = require("../extensions/custom-error");


const _A_ = 'A'.charCodeAt();
const LATIN_AMOUNT = 26;

const isString = (x) => typeof x == 'string' || x instanceof String;

const latinFiniteMonoid = (x, i) => String.fromCharCode((x.charCodeAt() + i - _A_) % LATIN_AMOUNT + _A_);

const LATIN = Array(LATIN_AMOUNT).fill('A').map(latinFiniteMonoid);

const genTabulaRecta = (record) => LATIN.reduce((acc, x, i) => {
  acc[x] = LATIN.reduce((o,x) => record(o,x,i), {});
  return acc
}, {});

const EncTabulaRecta = genTabulaRecta((o,x,i) => { o[x] = latinFiniteMonoid(x,i); return o });
const DecTabulaRecta = genTabulaRecta((o,x,i) => { o[latinFiniteMonoid(x,i)] = x; return o });


function* repeat(xs) { while(true) for (let x of xs) yield x; }

class VigenereCipheringMachine {
  constructor(direct=true) {
    this.direct = direct;
  }

  encrypt(msg, key) { return this.process(msg, key, EncTabulaRecta); }
  decrypt(msg, key) { return this.process(msg, key, DecTabulaRecta); }

  process(msg, key, tabulaRecta) {
    this.validate(msg, key);
    msg = msg.toUpperCase();
    const genKey = repeat(key.toUpperCase());

    let res = msg.split('').map(x => x < 'A' || x > 'Z' ? x : tabulaRecta[genKey.next().value][x]);

    return this.direct ? res.join('') : res.reverse().join('');
  }

  validate(msg, key) {
    if (!isString(msg) || !isString(key)) throw new Error('Params must be string!');
  }
}

module.exports = VigenereCipheringMachine;
