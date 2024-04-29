const { App, LogLevel } = require('@slack/bolt');
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 3000
});



// if (sugarLevel = 0) {
//     const chaiMessage = "Woah, are you sure you want chai without sugar?"
// }



// something like



// Listens to incoming messages that contain "hello"
app.command('/start-story', async ({ message, say, client, ack, command }) => {
  await ack();


  const userID = command.user_id;

  // let's see if this worksß

  await say(`ID: ${userID}`)
  const user = await prisma.story.create({
    data: {
      buyMilk: false,
      visits: 1,
      milkInChai: false,
      sugarinChai: false,
      id: userID
    },
  })

  client.chat.postMessage({                          // <--- and here
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    text: `<@${command.user_id}> started a story!`
  });


  // say() sends a message to the channel where the event was triggered

});

app.command('/reset-story', async ({ message, say, client, ack, command }) => {
  await ack()
  const userID = command.user_id;
  try {
    client.chat.postEphemeral({                          // <--- and here
      token: process.env.SLACK_BOT_TOKEN,
      channel: command.channel_id,
      user: userID,
      text: "Your story has been reset"
    });
    const updateUser = await prisma.story.update({
      where: {
        id: userID
      },
      data: {
        visits: 0
      },
    })
  } catch (e) {
    console.log(e)
    client.chat.postEphemeral({
      token: process.env.SLACK_BOT_TOKEN,
      channel: command.channel_id,
      user: userID,
      text: `${e}`,
    })
  }
})


app.message('milk', async ({ message, say, client, body }) => {

  const userID = message.user

  try {
  const addMilk = await prisma.story.update({
    where: {
      id: userID
    },
    data: {
      milkInChai: true
    },
  })
} catch(e) {
  await say(e)
}

  await say({ text: "You added milk to your chai!", thread_ts: message.ts });


});


(async () => {
  // Start your app
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();
