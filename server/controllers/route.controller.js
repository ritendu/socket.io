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

const createSubcription = async(req,res)=>{

  const product = await stripe.products.create({
    name: 'Gold Plan',
  });
  const customer = await stripe.customers.create({
    name: 'JELLY',
    email: 'jelly@gmail.com',
    shipping:{
      name:'Jelly Bean',
    address:{
      city:'Kolkata',
      country:"India",
      state:"West Bengal",

    }
    }
  });


const paymentMethod = await stripe.paymentMethods.create({
  type: 'card',
  card: 
    {token: "tok_1OJboHSENL3MHdtsqg1OZfzM"}
  
});


const attachpaymentMethod = await stripe.paymentMethods.attach(
  paymentMethod.id,
  {
    customer: customer.id,
  }
);

  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: 1000,
    recurring: {
      interval: 'month',
    },
    product:product.id
  });


  // const subscription = await stripe.subscriptions.create({
  //   customer: customer.id,
  //   items: [
  //     {
  //       price: price.id,
  //     },
  //   ],
  //   default_payment_method:paymentMethod.id,
  //   // billing_cycle_anchor:'year'

  // });
  const newBillingCycleAnchor = Math.floor(Date.now() / 1000) + 24 * 3600; 
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{
      price: price.id,
    }],
    payment_behavior: 'default_incomplete',
    default_payment_method:paymentMethod.id,
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    billing_cycle_anchor:newBillingCycleAnchor
  });
console.log(subscription,"subscription")
//   console.log(subscription.latest_invoice.payment_intent,"subscription")
//   const confirmation = await stripe.paymentIntents.confirm(subscription.latest_invoice.payment_intent.id);
// console.log(confirmation,"confirmation")

}

const createInvoice = async(req,res)=>{
  const invoice = await stripe.invoices.retrieve('in_1OJYqzSENL3MHdtsTOQyga28', {
    expand: ["payment_intent"],
  });
  console.log(invoice,"invoice")
}

module.exports = {createPaymentIntent,createSubcription,createInvoice}