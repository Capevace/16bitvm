const assembly = `
LDV A 41
MOV C A
LDV A 41
LDP A C
HLT
`;

let registers = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  IP: 0,
  SP: 0
};

let stack = [];

function setRegisters(newRegisters) {
  Object.assign(registers, newRegisters);
  console.log(registers);
  document.querySelector('#register-a').textContent = registers.A;
  document.querySelector('#register-b').textContent = registers.B;
  document.querySelector('#register-c').textContent = registers.C;
  document.querySelector('#register-d').textContent = registers.D;
  document.querySelector('#register-ip').textContent = registers.IP;
  document.querySelector('#register-sp').textContent = registers.SP;
}

function setStack(newStack) {
  stack = newStack;

  document.querySelector('#stack').textContent = JSON.stringify(stack);
}

function init() {
  document.querySelector('#asm').value = assembly;

  const socket = io();

  socket.on('connect', () => {
    console.log('Connection');
  });

  socket.on('registers_update', data => setRegisters(data.registers));
  socket.on('stack_update', data => setStack(data.stack));

  document.querySelector('#cpr-button').addEventListener('click', e => {
    socket.emit('run_asm', {
      asm: document.querySelector('#asm').value
    });
  });
}

init();
