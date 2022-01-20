function myLoader(source) {
  debugger
  if (this.resource === '/Users/hao/Code/wp/src/index.js') {
    source += `;console.log('MonkaS')`
  }
  return source
}

module.exports = myLoader
