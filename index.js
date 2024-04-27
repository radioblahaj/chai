const { App, LogLevel } = require('@slack/bolt');
require('dotenv').config()


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 3000
});

let milkInChai = false;
let buyMilk = false;
const market = "firehouse";
let sugarLevel = 0; // Default

// if (sugarLevel = 0) {
//     const chaiMessage = "Woah, are you sure you want chai without sugar?"
// }



// something like



// Listens to incoming messages that contain "hello"
app.message('chai', async ({ message, say }) => {

try {
  const user = await app.client.users.info({ user: body.user.id })
  await say(`${user}`)
  // then...

  // yes
} catch (e) {
  await say(`${e}`)
}
  
  if(milkInChai = false) {
    await say({text: "Do you want milk in your chai?", thread_ts: message.ts})
    milkInChai = true
  } else {
    await say("You already have milk in your chai")
  }

  // say() sends a message to the channel where the event was triggered

});

app.message("yes", async ({message, say}) => {




})


app.message('milk', async({message, say}) => {

  
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
