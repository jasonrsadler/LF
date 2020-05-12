/* global describe, it */
const assert = require('assert')
const { runCipher } = require('../cipher')

describe('runCipher unit tests', () => {
  it('returns empty on empty message', () => {
    const str = runCipher(0, '')
    assert.strictEqual(str, '')
  })
  it('returns same string when no offset specified', () => {
    const str = runCipher(0, 'A test message')
    assert.strictEqual(str, 'A test message')
  })
  it('returns correct ceaser cipher with proper offset', () => {
    const str = runCipher(2, 'A test message')
    assert.strictEqual(str, 'C vguv oguucig')
  })
  it('rolls alphabet (by case) back to beginning when wrapping from end', () => {
    const str = runCipher(1, 'A snooze Zone')
    assert.strictEqual(str, 'B toppaf Apof')
  })
  it('offsets to end of alphabet and wraps properly', () => {
    const str = runCipher(25, 'A test message')
    assert.strictEqual(str, 'Z sdrs ldrrzfd')
  })
  it('handles factors of alphabet length properly', () => {
    const str = runCipher(26, 'A test message')
    assert.strictEqual(str, 'A test message')
  })
  it('handles multiple factors of alphabet length properly', () => {
    const str = runCipher(52, 'A test message')
    assert.strictEqual(str, 'A test message')
    const str2 = runCipher(78, 'Another test message')
    assert.strictEqual(str2, 'Another test message')
  })
  it('handles offset values larger than alphabet length', () => {
    const str = runCipher(4, 'A test message')
    const str2 = runCipher(30, 'A test message')
    assert.strictEqual(str, str2)
  })
  it('does not match unexpected results', () => {
    const str = runCipher(5, 'A test message')
    assert.notStrictEqual(str, 'A test message')
  })
  it('preserves punctuation and spaces', () => {
    const str = runCipher(7, 'A test Message, for me?!')
    assert.strictEqual(str, 'H alza Tlzzhnl, mvy tl?!')
  })
})
