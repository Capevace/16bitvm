const EventEmitter = require('events');
const { SHOULD_EXIT } = require('../constants');
const createRegisters = require('./registers');
const execute = require('./execution');

function cpu(memory, stackFactory) {
  const registers = createRegisters();
  const stack = stackFactory(registers);
  const events = new EventEmitter();

  const fetchInstruction = () => {
    return memory[registers.IP++];
  };

  const cycle = () => {
    const instruction = fetchInstruction();
    return execute(instruction, registers, memory, stack);
  };

  const run = () => {
    if (!cycle()) {
      setImmediate(run);
    } else {
      if (SHOULD_EXIT) process.exit(0);
    }

    events.emit('update', registers, memory, stack);
  };

  return {
    cycle,
    run,
    events
  };
}

module.exports = cpu;
