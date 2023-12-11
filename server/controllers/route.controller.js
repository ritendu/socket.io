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

  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: 
      {token: req.body.tokenId}
    
  });

  const customer = await stripe.customers.create({
    name: 'JELLY',
    email: 'jelly@gmail.com',
    shipping: {
      name: 'Customer Name', // Replace with the customer's name
      address: {
        line1: 'Address Line 1',
        line2: 'Address Line 2',
        city: 'City',
        state: 'State',
        postal_code: 'Postal Code',
        country: 'IN', // Replace with the country code (e.g., 'IN' for India)
      },
    },
  });


const attachpaymentMethod = await stripe.paymentMethods.attach(
  paymentMethod.id,
  {
    customer: customer.id,
  }
);

const updatedCustomer  = await stripe.customers.update(
  customer.id,
  {
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });
  const price = await stripe.prices.create({
    currency: 'inr',
    unit_amount: 1000,
    recurring: {
      interval: 'month',
    },
    product:product.id
  });

  const desiredBillingCycleStart = new Date('2023-09-01T00:00:00'); // Replace with your desired start date
  const billingCycleAnchor = Math.floor(desiredBillingCycleStart.getTime() / 1000);
  
  // Calculate the Unix timestamp for the desired end date (e.g., 3 months later)
  const desiredEnd = new Date('2023-12-01T00:00:00'); // Replace with your desired end date
  const desiredEndTimestamp = Math.floor(desiredEnd.getTime() / 1000);

  const subscription = await stripe.subscriptions.create({
    customer:updatedCustomer.id,
    items:[{
      price:price.id
    }],
    default_payment_method:paymentMethod.id,
    payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      billing_cycle_anchor: billingCycleAnchor,
      cancel_at:desiredEndTimestamp
  })
console.log(subscription,"subscription")
res.send({data:subscription.latest_invoice.payment_intent.client_secret})


}



const getRequest = async(req,res)=>{
console.log("Hello")
}

module.exports = {createPaymentIntent,createSubcription,getRequest}