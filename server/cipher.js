const fs = require('fs')
const path = require('path')

const limits = {
  lowerHighCharCode: 122,
  lowerLowCharCode: 97,
  upperHighCharCode: 90,
  upperLowCharCode: 65
}

module.exports.runCipher = (offset, message) => {
  if (offset % 26 === 0) {
    return message
  }
  let strArr = message.split('')
  for (let ix = strArr.length - 1; ix >= 0; ix--) {
    if (isAlpha(strArr[ix])) {
      const offsetRemainder = offset % 26
      let charCode = strArr[ix].charCodeAt(0)
      if (charCode < limits.lowerLowCharCode && (charCode + offsetRemainder) > limits.upperHighCharCode) {
        charCode = charCode - (limits.upperHighCharCode - limits.upperLowCharCode + 1)
      } else if (charCode > limits.upperHighCharCode && (charCode + offsetRemainder) > limits.lowerHighCharCode) {
        charCode = charCode - (limits.lowerHighCharCode - limits.lowerLowCharCode + 1)
      }
      strArr.splice(ix, 1, String.fromCharCode(charCode + (offset < 26 ? offset : offsetRemainder)))
    }
  }
  const dir = path.join(__dirname, '/storage')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  fs.writeFile(dir + '/cipher.txt', strArr.join(''), (err) => {
    if (err) {
      strArr = []
    }
  })
  return strArr.join('')
}

const isAlpha = (char) => {
  return char.split('').length === 1 && typeof char === 'string' && char.toUpperCase() !== char.toLowerCase()
}
