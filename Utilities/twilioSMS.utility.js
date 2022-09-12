const accountSid = 'AC756b8d69c8c5cdf1897b1dbb7a5a85f0';
const authToken = '5cff6251e4a9d95206a00d7a935cea5e';
const client = require('twilio')(accountSid, authToken);


exports.sendMobileSMS = async ( body , to) => {
 return await client.messages .create({
      body,
      to,
      from: '+19378264312' });
}