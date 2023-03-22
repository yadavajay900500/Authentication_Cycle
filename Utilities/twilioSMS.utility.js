const accountSid = 'AC7........................';
const authToken = '5cff............................';
const client = require('twilio')(accountSid, authToken);


exports.sendMobileSMS = async ( body , to) => {
 return await client.messages .create({
      body,
      to,
      from: '+19378264312' });
}
