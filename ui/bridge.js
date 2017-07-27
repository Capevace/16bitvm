const asm = require('../shared/assembly');
const cpu = require('../shared/cpu');
const memory = require('../shared/memory');

function createCpu(assembly) {
  const mem = memory();
  const program = asm(assembly);
  program.forEach((v, i) => {
    mem.memory[i] = v;
  });

  const c = cpu(mem);
  return c;
}

module.exports = {
  createCpu
};
