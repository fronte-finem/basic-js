const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if (members == undefined || !Array.isArray(members)) return false;

  return members
          .filter(x => typeof x == 'string')
          .map(x => x.trimStart()[0].toUpperCase())
          .sort((a, b) => a.charCodeAt() - b.charCodeAt())
          .join('');
};
