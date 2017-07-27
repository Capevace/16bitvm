const { INSTRUCTION_MAP, REGISTERS } = require('../constants');
const splitInstruction = require('./split-instruction');

function execute(instruction, registers, memory, stack) {
  const [
    opcodeNr,
    destinationRegister,
    sourceRegister,
    high8,
    high10
  ] = splitInstruction(instruction);
  const opcode = INSTRUCTION_MAP[opcodeNr];

  switch (opcode) {
    // Move value from register A to B
    case 'MOV':
      registers[REGISTERS[destinationRegister]] =
        registers[REGISTERS[sourceRegister]];
      return false;

    // Load value into register
    case 'LDV':
      registers[REGISTERS[destinationRegister]] = high10;
      return false;

    // Load value from memory at address from register into register
    case 'LDR':
      registers[REGISTERS[destinationRegister]] =
        memory[registers[REGISTERS[sourceRegister]]];
      return false;

    // Load value from memory at address into register
    case 'LDA':
      registers[REGISTERS[destinationRegister]] = memory[high10];
      return false;

    // Load value of register into memory at address
    case 'LDM':
      memory[high10] = registers[REGISTERS[destinationRegister]];
      return false;

    // Load value from register into memory at address from register
    case 'LDP':
      memory[registers[REGISTERS[destinationRegister]]] =
        registers[REGISTERS[sourceRegister]];
      return false;

    // Arithmetic function, TODO
    case 'ATH':
      return false;

    // Push value from register into stack
    case 'PSH':
      stack.push(registers[REGISTERS[sourceRegister]]);
      return false;

    case 'POP':
      registers[REGISTERS[destinationRegister]] = stack.pop();
      return false;

    case 'HLT':
      return true;
    default:
      console.log('Unknown opcode');
      process.exit(1);
      return false;
  }
}

function decode() {}

module.exports = execute;
