const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites
    ]
});

client.once('ready', () => {
    console.log("ready");
});

client.on("messageCreate", async message => {
    if (message.content === "setup") {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Verify")
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("1")
            );

        await message.delete();
        await message.channel.send({ components: [row] });
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "1") {
        const member = interaction.member;
        const role = interaction.guild.roles.cache.find(role => role.id === ""); //roleId

        if (role) {
            await member.roles.add(role);
            await interaction.reply({ content: "تم تحقق بنجاح", ephemeral: true });
        } else {
            await interaction.reply({ content: "Role not found", ephemeral: true });
        }
    }
});

client.login("MTMwNzAxNTgwMzQ5NzA5MTIxNA.Gu4_c1.y_T9mkJgJnilum88edDrj1ZkCDZWMo5r49yQBg") //token bot
