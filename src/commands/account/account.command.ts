import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { defaultLanguage } from "../../config/globals";
import { Command, Logger } from "../../libs";
import { generateLocalization } from "../../libs/utils";
import { localizations } from "./settings";

const builder = new SlashCommandBuilder()
  .setName(localizations[defaultLanguage].account)
  .setNameLocalizations(generateLocalization(localizations, "account"))
  .setDescription(localizations[defaultLanguage].description)
  .setDescriptionLocalizations(
    generateLocalization(localizations, "description")
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName(localizations[defaultLanguage].create.name)
      .setNameLocalizations(generateLocalization(localizations, "create.name"))
      .setDescription(localizations[defaultLanguage].create.name)
      .setDescriptionLocalizations(
        generateLocalization(localizations, "create.description")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName(localizations[defaultLanguage].update.name)
      .setNameLocalizations(generateLocalization(localizations, "update.name"))
      .setDescription(localizations[defaultLanguage].update.name)
      .setDescriptionLocalizations(
        generateLocalization(localizations, "update.description")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName(localizations[defaultLanguage].view.name)
      .setNameLocalizations(generateLocalization(localizations, "view.name"))
      .setDescription(localizations[defaultLanguage].view.name)
      .setDescriptionLocalizations(
        generateLocalization(localizations, "view.description")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName(localizations[defaultLanguage].delete.name)
      .setNameLocalizations(generateLocalization(localizations, "delete.name"))
      .setDescription(localizations[defaultLanguage].delete.name)
      .setDescriptionLocalizations(
        generateLocalization(localizations, "delete.description")
      )
  );

export class AccountSetupCommand extends Command {
  constructor() {
    super(builder);
  }

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.options.getSubcommand()) {
      await interaction.reply(`Please provide a valid subcommand.`);
      return;
    }

    Logger.info("*****[]", interaction.options.getSubcommand());
    console.log("MEMBER", interaction.member?.user);
    // console.log("USRES", interaction;

    // if (interaction.options?.getSubcommand() === "user") {
    //   const user = interaction.options.getUser("target");

    //   if (user) {
    //     await interaction.editReply(
    //       `Username: ${user.username}\nID: ${user.id}`
    //     );
    //   } else {
    //     await interaction.editReply(
    //       `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
    //     );
    //   }
    // } else if (
    //   interaction.options?.getSubcommand() === "server" &&
    //   interaction.guild
    // ) {
    //   await interaction.reply(
    //     `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    //   );
    // }

    // await interaction.reply(
    //   `Banning ${target?.username} for reason: ${reason}`
    // );

    // if (interaction.guild && target) {
    //   await interaction.guild.members.ban(target);
    // }
    // const [a, b] = await promiseGuard(
    // interaction.reply({
    //   content: "Pinging. 222..",
    //   fetchReply: true,
    //   ephemeral: true,
    // })
    // );
    // await interaction.deferReply({ ephemeral: true, fetchReply: true });
    // await sleep(1_500);
    // await interaction.editReply("Pong again!");
    // Logger.info(interaction.options);
    // // await sleep(1_500);
    // // await interaction.editReply("Pong again 222!");
    // // await sleep(1_500);
    // // await interaction.editReply("Pong again LAST!");
    // const target = interaction.options.getUser("target");
    // Logger.info("*****", target);
    // await interaction.deferReply();
    // await sleep(3_500);
    // await sleep(1_500);
    // await interaction.followUp("Pong FOLLOW");
    // await sleep(1_500);
    // // await interaction.deleteReply();
    // console.log(interaction.locale);
    // const message = await interaction.fetchReply();
    // Logger.success(message);
    // if (a) {
    //   await promiseGuard(
    //     interaction.reply({
    //       content: `Error occured: ${a.message}`,
    //       // fetchReply: true,
    //     })
    //   );
    // }
    // else {
    //   await promiseGuard(
    //     interaction.reply({
    //       content: "All good mate.",
    //       fetchReply: true,
    //     })
    //   );
    // }

    // console.log("AAc", a);
    // console.log("BB", b);
    // interaction.editReply(
    //   `Pong! Latency 222 is ${sent.createdTimestamp - interaction.createdTimestamp}ms.`
    // );
  }
}
