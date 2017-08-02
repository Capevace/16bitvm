module.exports = () => ({
  memory: require('./memory')(),
  stackFactory: require('./stack-factory')()
});
