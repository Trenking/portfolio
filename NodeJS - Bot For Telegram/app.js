var TelegramBot = require('node-telegram-bot-api');
var token = '204192791:AAHJHRVvqX2yduar3bwHwyJGX_E3Hy4gV2I';
var bot = new TelegramBot(token, {polling: true});
var country;
bot.onText(/^\/voucher (.+)$/, function (msg, match) {
  country = match[1];
    var href='http://www.otpusk.com/search/'+country;
  bot.sendMessage(msg.chat.id, 'The cheapest vouchers to ' + country + ' is here: '+href);
 });
