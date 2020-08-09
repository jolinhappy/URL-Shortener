function shortener() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = []

  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))

  let short = ''
  for (let i = 0; i < 5; i++) {
    short += random(collection)
  }

  return short
}


function random(collection) {
  const index = Math.floor(Math.random() * collection.length)
  return collection[index]
}

module.exports = shortener