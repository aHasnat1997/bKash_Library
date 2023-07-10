const bKashPayment = require("./bKash_functions/bKash");

const api_key = '4f6o0cjiki2rfm34kfdadl1eqq';
const app_secret = '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b';
const username = 'sandboxTokenizedUser02';
const password = 'sandboxTokenizedUser02@12345';


const bkash = new bKashPayment(api_key, app_secret, username, password);

// Create a new checkout
// bkash.createCheckout(100, 'BDT', 'payment')
//   .then((checkout) => {
//     console.log('Checkout created:', checkout);
//     // You can redirect the user to the provided `redirectURL`
//   })
//   .catch((error) => {
//     console.error('Failed to create checkout:', error);
//   });

// Execute a payment
// bkash.executePayment('payment_token', 100, 'transaction_id')
//   .then((payment) => {
//     console.log('Payment executed:', payment);
//   })
//   .catch((error) => {
//     console.error('Failed to execute payment:', error);
//   });

// bkash.generateAccessToken()
//     .then(token => {
//         console.log(token);
//     })
//     .catch((error) => {
//         console.error('Failed to create checkout:', error);
//     });

// bkash.refreshAccessToken()
//     .then(refToken => console.log(refToken))
//     .catch(error => console.log('Failed to create checkout:', error))

bkash.createAgreement('100', 'https://a-hasnat.web.app/')
    .then(refToken => console.log(refToken))
    .catch(error => console.log('Failed to create checkout:', error))
