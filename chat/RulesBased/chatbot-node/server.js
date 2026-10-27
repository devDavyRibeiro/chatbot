const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", (req, res) => {
  const message = req.body.message.toLowerCase();
  let response = "Desculpe, não entendi sua pergunta.";

  if (message.includes("login")) {
    response = "Você pode redefinir sua senha clicando em 'Esqueci minha senha'.";
  } else if (message.includes("plano")) {
    response = "Temos planos Básico e Premium. Qual você gostaria de saber mais?";
  } else if (message.includes("atendente")) {
    response = "Ok! Encaminhando você para um atendente.";
  }
  else if (message.includes("horário")) {
    response = "Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.";
  }
  else if (message.includes("contato")) {
    response = "Você pode entrar em contato conosco pelo e-mail contato@empresa.com";
  } 
  else if (message.includes("preço")) {
    response = "Nossos preços variam de acordo com o plano escolhido. Por favor, visite nosso site para mais detalhes.";
  }

  res.json({ reply: response });
});

app.listen(3000, () => console.log("Chatbot rodando na porta 3000"));
