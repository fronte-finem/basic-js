const CustomError = require("../extensions/custom-error");

const chainMaker = {
  getLength() {
    return this._chain.length;
  },

  addLink(value) {
    if (!this._chain) this._chain = [];
    this._chain.push(String(value));
    return this;
  },

  removeLink(position) {
    if (!this._chain) {
      throw new Error('Chain is empty!');
    }
    if (!Number.isInteger(position)) {
      this._destroy();
      throw new Error('Given position is not the integer!');
    }
    if (position < 1 || position > this.getLength()) {
      this._destroy();
      throw new Error('Given position out of range!');
    }
    this._chain.splice(position - 1, 1);
    return this;
  },

  reverseChain() {
    if (!this._chain) return this;
    this._chain.reverse();
    return this;
  },

  finishChain() {
    let fancyChain = this._chain.map(x => `( ${x} )`).join('~~');
    this._destroy();
    return fancyChain;
  },

  _destroy() {
    this._chain = undefined;
  }
};

module.exports = chainMaker;
