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
console.log(req.body,"Inside Subscription Backend")
  const product = await stripe.products.create({
    name: 'Gold Plan',
  });

  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: 
      {token: req.body.tokenId}
    
  });
  console.log(paymentMethod,"paymentMethod")
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

  console.log(customer,"customer")





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


  const subscription = await stripe.subscriptions.create({
    customer:updatedCustomer.id,
    items:[{
      price:price.id
    }],
    default_payment_method:paymentMethod.id,
    payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
  })

res.send({data:subscription.latest_invoice.payment_intent.client_secret})


}



const getRequest = async(req,res)=>{
console.log("Hello")
}

module.exports = {createPaymentIntent,createSubcription,getRequest}