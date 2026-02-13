const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
rl.question("Digite od primeiro número: ", (n1) => {
  rl.question("Digite o segundo número: ", (n2) => {
    let numero1 = Number(n1);
    let numero2 = Number(n2);

    console.log("=== Resultados ===");
    console.log("Soma:", numero1 + numero2);
    console.log("Subtração:", numero1 - numero2);
    console.log("Multiplicação:", numero1 * numero2);
    console.log("Divisão:", numero1 / numero2);
    console.log("Resto:", numero1 % numero2);

    let valor = numero1;

    valor += numero2;
    console.log("Após += :", valor);

    valor -= numero2;
    console.log("Após -= :", valor);

    valor *= numero2;
    console.log("Após *= :", valor);

    valor /= numero2;
    console.log("Após /= :", valor);

    valor %= numero2;
    console.log("Após %= :", valor);

    rl.close();
  });
});
