// buffer é uma maneira mais eficiente de escrever e ler da memoria de uma forma binária de baixo nível

const buf = Buffer.from("Hello")

console.log(buf.toJSON())