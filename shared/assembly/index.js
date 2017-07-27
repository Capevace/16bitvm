const { INSTRUCTION_MAP } = require('../constants');
const encoder = require('./encode-instruction');

function asm(assembly) {
  const operations = assembly
    .split('\n')
    .map(v => v.replace(/^\s*|\s*$/g, ''))
    .filter(v => !!v)
    .map(v => v.split(' '));

  const instructions = processOperations(operations);
  const uintArray = encode(instructions);
  return uintArray;
}

function processOperations(operations) {
  let processed = [];
  for (const op of operations) {
    if (!INSTRUCTION_MAP.includes(op[0].toUpperCase())) {
      throw new Error('Unknown instruction: ' + op[0].toUpperCase());
    }

    processed.push({
      instruction: op[0].toUpperCase(),
      argv: op.slice(1, op.length)
    });
  }

  return processed;
}

function encode(instructions) {
  const output = new Uint16Array(instructions.length);

  instructions.forEach((ins, index) => {
    output[index] = encoder[ins.instruction](ins.argv);
  });

  return output;
}

module.exports = asm;
