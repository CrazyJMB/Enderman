const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;

    console.log(message.content);

    const { content } = message;

    for (const word of words) {
      if (content.toLowerCase().includes(word.word)) {
        message.channel.send(word.answer);
        break;
      }
    }
  },
};

const words = [
  {
    word: "hola",
    answer: "Hola, pa ti mi cola ji ji ji",
  },
  {
    word: "bot",
    respuesta: "Sí, soy un bot. ¿En qué puedo asistirte?",
  },
];
