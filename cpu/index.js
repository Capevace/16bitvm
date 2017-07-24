const registers = require('./registers');
const execute = require('./execution');

function cpu(mem) {
	const memory = mem.memory;
	const stack = mem.stack(registers);

	const fetchInstruction = () => {
		return memory[registers.IP++];
	};	

	const cycle = () => {
		const instruction = fetchInstruction();
		return execute(instruction);
	};

	const run = () => {
		if (!cycle()) {
			setImmediate(run);
		} else {
			process.exit(0);
		}
	};

	return {
		cycle,
		run
	};
}

module.exports = cpu;