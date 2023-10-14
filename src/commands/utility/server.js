const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server.")
    .setDescriptionLocalizations({
      SpanishES: "Información sobre el servidor",
    }),
  async execute(interaction) {
    const address = process.env.IP;

    try {
      const response = await axios.get(`https://api.mcsrvstat.us/3/${address}`);
      const serverData = response.data;

      if (serverData.online) {
        await interaction.reply(
          `El servidor ${serverData.motd.clean.join(
            " "
          )} está en línea y tiene ${serverData.players.online} jugadores.`
        );
      } else {
        await interaction.reply(`El servidor está actualmente desconectado.`);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Hubo un error al obtener la información del servidor."
      );
    }
  },
};
