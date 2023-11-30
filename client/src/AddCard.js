import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
const AddCard = ()=>{
    const stripe = useStripe();
  const elements = useElements();
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
console.log("Hello")
const { token, error } = await stripe.createToken(elements.getElement(CardElement));
console.log(token,"token")

    if (error) {
        console.log(error,">>>>>>>")
      // Show error to your customer (for example, payment details incomplete)
    //   console.log(result.error.message,"????????");
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

    return (
        <form>
        <CardElement options={cardElementOptions}/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    )
}

export default AddCard