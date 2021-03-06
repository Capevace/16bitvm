const { STACK_SIZE } = require('../constants');

module.exports = () => {
  const stack = new Uint16Array(STACK_SIZE);
  return registers => ({
    push(value) {
      if (registers.SP === STACK_SIZE - 1) {
        console.error('Stack overflow...');
        process.exit(1);
      }

      stack[registers.SP++] = value;
    },

    pop() {
      if (registers.SP === 0) {
        console.error('Stack underflow...');
        process.exit(1);
      }

      return stack[--registers.SP];
    },

    raw: stack
  });
};
