require('dotenv').config();
const Agreement = require('./agreement');
const Base = require('./base');

const username = process.env.BKASH_USERNAME;
const passwd = process.env.BKASH_PASSWORD;
const appKey = process.env.BKASH_APP_KEY;
const appSecret = process.env.BKASH_APP_SECRET;
const callbackUrl = 'http://localhost:3000';

class Bkash extends Base {
  constructor(username, password, appKey, appSecret, callbackUrl, isDev) {
    super(username, password, appKey, appSecret, callbackUrl, isDev);

    this.agreement = Object.assign(new Agreement(), this);
  }
}


(async function () {
  const b = await (new Bkash(username, passwd, appKey, appSecret, callbackUrl)).init();
  console.dir(b, { depth: Infinity });

  // // Create a new agreement
  // var aggreement = await b.agreement.createAgreement({
  //   mode: '0000',
  //   payerReference: '01770618575'
  // });
  // console.log(aggreement);

  // await new Promise(r => setTimeout(r, 1000 * 60 * 1));
  // // Execute the agreement
  // var aggreement = await b.executeAgreement(aggreement.paymentID);
  // console.log(aggreement);
})();