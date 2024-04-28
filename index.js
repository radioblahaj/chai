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


  // say() sends a message to the channel where the event was triggered

});

app.message("yes", async ({ message, say }) => {




})


app.message('milk', async ({ message, say }) => {


  await say({ text: "I'm awake! ⭐️ Do you need assistance?", thread_ts: message.ts });








  await say("There isn't milk")
  buyMilk = true;
  if (buyMilk) {
    await say("Do you want to buy milk")
  }
});



(async () => {
  // Start your app
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();
