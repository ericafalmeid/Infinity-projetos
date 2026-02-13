const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Digite sua idade: ", (idadeTexto) => {
  rl.question("Digite seu status (registrado ou não registrado): ", (statusTexto) => {
    const idade = Number(idadeTexto);
    const statusUsuario = statusTexto.toLowerCase();

    const classificacao = idade >= 18 ? "maior de idade" : "menor de idade";
    console.log(`Você é ${classificacao}.`);

    switch (statusUsuario) {
      case "registrado":
        console.log("Bem-vindo! Seu registro está completo.");
        break;
      case "não registrado":
      case "nao registrado":
        console.log("Por favor, complete seu registro.");
        break;
      default:
        console.log("Status desconhecido.");
        break;
    }

    if (idade >= 18 && statusUsuario === "registrado") {
      console.log("Acesso completo liberado.");
    }

    if (idade < 18 || statusUsuario !== "registrado") {
      console.log("Acesso limitado.");
    }

    rl.close();
  });
});
