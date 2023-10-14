const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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

      const embedMessage = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Server Info de InfoJobs")
        .setDescription(serverData.motd.clean.join(" "))
        .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${address}`)
        .addFields(
          {
            name: "Estado",
            value: serverData.online ? "Online" : "Offline",
            inline: true,
          },
          {
            name: "Jugadores",
            value: `${serverData.players.online} / ${serverData.players.max}`,
            inline: true,
          },
          { name: "Versión", value: serverData.version, inline: true },
          { name: "IP", value: address }
        )
        .setTimestamp()
        .setFooter({
          text: "Enderman",
          iconURL:
            "https://cdn.discordapp.com/avatars/636614369605582878/52bea1ea7e1e6693360f2b92279b3938",
        });

      await interaction.reply({ embeds: [embedMessage] });
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Hubo un error al obtener la información del servidor."
      );
    }
  },
};
