const asm = require('./assembly');
const cpu = require('./cpu');
const memoryFactory = require('./memory');

function createCpu(assembly) {
  const mem = memoryFactory();
  const program = asm(assembly);
  program.forEach((v, i) => {
    mem.memory[i] = v;
  });

  const c = cpu(mem.memory, mem.stackFactory);
  return c;
}

module.exports = {
  createCpu
};
