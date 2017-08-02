const asm = require('./shared/assembly');
const cpu = require('./shared/cpu');
const mem = require('./shared/memory')();

const assembly = `
	LDV A 41
  MOV C A
  LDV A 41
  LDP A C
  HLT
`;

const program = asm(assembly);
program.forEach((v, i) => {
  mem.memory[i] = v;
});

const c = cpu(mem);
c.run();
