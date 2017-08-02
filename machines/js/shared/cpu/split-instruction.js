const {
  DESTINATION_SHIFT,
  SOURCE_SHIFT,
  ADDRESS_SHIFT,
  LONG_ADDRESS_SHIFT
} = require('../constants');

const splitInstruction = instruction => [
  instruction & 0b0000000000001111,
  (instruction & 0b0000000000110000) >> DESTINATION_SHIFT,
  (instruction & 0b0000000011000000) >> SOURCE_SHIFT,
  (instruction & 0b1111111100000000) >> ADDRESS_SHIFT,
  (instruction & 0b1111111111000000) >> LONG_ADDRESS_SHIFT
];

module.exports = splitInstruction;
