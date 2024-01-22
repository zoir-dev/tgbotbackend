const TelegramBot = require('node-telegram-bot-api')
const token='6540865337:AAGlhXBNOm6_vUtUSYrREUxYcIUZcN0-daw'
const web_url='https://burger-store1.vercel.app/'

const bot = new TelegramBot(token,{polling:true})

const boostrap=()=>{
  bot.on('message',async (msg)=>{
    const chatId=msg.chat.id
    const text=msg.text

    if(text==='/start'){
      console.log(msg)
      await bot.sendMessage(chatId,`Assalamu alaikum ${msg?.from.first_name}\nWelcome to 🍔 Burger store!\n\nSend name and phone number or 👇`,
      {
        reply_markup:{
          keyboard:[
          [
            {
              text:"See foods",
              web_app:{
                url:web_url
              }
            }
          ],
        ],
      }})
    }
    if(msg.web_app_data?.data){
      try {
        const data = JSON.parse(msg.web_app_data?.data)

        console.log(data)

        const totalPrice = data.data.reduce((sum, d) => sum + (d.price * d.count), 0);
        const messageText = data.data.map(d => `${d.title} - ${d.price}$ - ${d.count}`).join('\n');
        await bot.sendMessage(chatId,`You selected foods:\n\n${messageText}\n\nTotal Price: ${totalPrice}$`)

        const contactInfoMessage = `Contact Information:\n\nName: ${data.contact.name}\nPhone: ${data.contact.phone}\n\n We will contact you soon!`;
        await bot.sendMessage(chatId,contactInfoMessage)

      } catch (error) {
        console.log(error)

      }
    }
  })
  bot.on("polling_error", (msg) => console.log("Polling error:", msg));
}

boostrap()
