const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const natural = require("natural");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Classificador Bayesiano
const classifier = new natural.BayesClassifier();

// Treinamento básico
classifier.addDocument("oi", "saudacao");
classifier.addDocument("olá", "saudacao");
classifier.addDocument("bom dia", "saudacao");

classifier.addDocument("quero saber meu pedido", "pedido_status");
classifier.addDocument("meu pedido chegou", "pedido_status");
classifier.addDocument("acompanhar pedido", "pedido_status");

classifier.addDocument("quero cancelar meu pedido", "cancelamento");
classifier.addDocument("como faço para cancelar meu pedido", "cancelamento");
classifier.addDocument("cancelar pedido", "cancelamento");

classifier.addDocument("quero mais informações sobre o produto", "informacao_produto");
classifier.addDocument("me fale mais sobre o produto", "informacao_produto");
classifier.addDocument("detalhes do produto", "informacao_produto");

classifier.addDocument("obrigado", "agradecimento");
classifier.addDocument("valeu", "agradecimento");

classifier.train();

app.post("/chat", (req, res) => {
  const { message } = req.body;
  const intent = classifier.classify(message.toLowerCase());
  let reply = "Desculpe, não entendi.";

  switch (intent) {
    case "saudacao":
      reply = "Olá! Em que posso te ajudar hoje?";
      break;
    case "pedido_status":
      reply = "Para consultar seu pedido, informe o número ou e-mail da compra.";
      break;
    case "cancelamento":
      reply = "Para cancelar seu pedido, entre em contato com nosso suporte.";
      break;
    case "informacao_produto":
      reply = "Para mais informações sobre nossos produtos, visite nosso site ou fale com um atendente.";
      break;
    case "agradecimento":
      reply = "De nada! Estou sempre à disposição";
    break;
    
  }

  res.json({ reply, intent });
});

app.listen(3000, () => console.log("Chatbot PLN rodando na porta 3000"));
