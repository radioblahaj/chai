const { App, LogLevel } = require("@slack/bolt");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 3000,
});

// if (sugarLevel = 0) {
//     const chaiMessage = "Woah, are you sure you want chai without sugar?"
// }

// something like

// Listens to incoming messages that contain "hello"
app.command("/start-story", async ({ message, say, client, ack, command }) => {
  await ack();

  const userID = command.user_id;

  // let's see if this worksß

  const user = await prisma.story.create({
    data: {
      buyMilk: false,
      visits: 1,
      milkInChai: false,
      sugarinChai: false,
      id: userID,
    },
  });

  await say(`<@${command.user_id}> started a story`);
});

app.message("start", async ({ message, say, client, body }) => {
  const userID = message.user;

  await say("Thank you for visiting the cafe");

  const user = await prisma.story.update({
    where: {
      id: userID,
    },
    data: {
      visits: 1,
    },
  });
});

app.command("/make-coffee", async ({ message, say, client, ack, command }) => {
  await ack();

  const userID = command.user_id;

  await say(
    `<@${userID}> asked me to make coffee! I'm just a teapot, I can't make coffee. *418*`,
  );
});

app.command("/reset-story", async ({ message, say, client, ack, command }) => {
  await ack();
  const userID = command.user_id;
  try {
    client.chat.postEphemeral({
      channel: command.channel_id,
      user: userID,
      text: "Your story has been reset",
    });
    const updateUser = await prisma.story.update({
      where: {
        id: userID,
      },
      data: {
        visits: 0,
        milkInChai: false,
      },
    });
  } catch (e) {
    console.log(e);
    client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: command.channel_id,
      user: userID,
      text: `${e}`,
    });
  }
});

app.message("brew", ({ message, say, client, body }) => {
  const userID = message.user;
});

app.message("milk", async ({ message, say, client, body }) => {
  const userID = message.user;

  const userData = await prisma.story.findUnique({
    where: {
      id: userID,
    },
  });

  switch (userData.milkInChai) {
    case false:
      const addMilk = await prisma.story.update({
        where: {
          id: userID,
        },
        data: {
          milkInChai: true,
          visits: { increment: 1 },
        },
      });
      await say({
        text: "You added milk to your chai!",
        thread_ts: message.ts,
      });
      break;
    case true:
      await say("You already have milk in your chai");
      break;
  }
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
