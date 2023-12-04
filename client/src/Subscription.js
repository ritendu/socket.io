import {
  useStripe,useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
  } from "@stripe/react-stripe-js";
  const Subscription=()=>{
    const stripe = useStripe();
    const elements = useElements();
  const handlePayment= async()=>{
 
  //payment functionality
  }
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

// const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement));
// console.log(token,"token")

const confirmPayment = await stripe?.confirmCardPayment("pi_3OJbpfSENL3MHdts1VEGaKiO_secret_7DRy8ANyUElsdIgY3BxPwzJ2L")
console.log(confirmPayment,"confirmPayment")
    // if (error) {
    //     console.log(error,">>>>>>>")
    //   // Show error to your customer (for example, payment details incomplete)
    // //   console.log(result.error.message,"????????");
    // } else {
    //   // Your customer will be redirected to your `return_url`. For some payment
    //   // methods like iDEAL, your customer will be redirected to an intermediate
    //   // site first to authorize the payment, then redirected to the `return_url`.
    // }
  };
  
  return (
  <form onSubmit={handleSubmit}>
   <CardNumberElement/>
   <CardExpiryElement />
  <CardCvcElement />    
   <button>Confirm Payment</button>
  </form>
  )}
  

  export default Subscription