const stripe = require('stripe')('sk_test_51L4HYSSENL3MHdts3Tnz6dqYNyynOQnrWaBZ5PlbJuDCyODyRAbZgQCxR7BcPWyqbKHdfLrCIb4ndtV6p6DIOKZv00lCrJbupO');

const createPaymentIntent = async(req,res)=>{
  const customer = await stripe.customers.create({
    name: 'Jenny Rosen',
    email: 'jennyrosen@example.com',
  });
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'inr',
        payment_method_types: ['card'],
        customer:customer.id,
        setup_future_usage:"off_session"//attach the card as a payment method by default 
      });
      console.log(paymentIntent,"paymentIntent")
}

module.exports = {createPaymentIntent}