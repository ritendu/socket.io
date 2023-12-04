import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const Form = ()=>{
    const stripePromise = loadStripe('pk_test_51L4HYSSENL3MHdtsuslXVbaX1Rk8f4BDTMUx3rTEkU2OrhN7wnH2siVwfzTM7Wpy7WOfvvVgeGDw5QNDZOjptneO00ZqnOA51t');

    const options = {
        // passing the client secret obtained from the server
        // clientSecret: 'pi_3OI6g5SENL3MHdts1WZ7jkbe_secret_92hsEK0waf9ak3QKwr4S0Hhve',
        clientSecret:   "pi_3OJYqzSENL3MHdts1IJrHwxr_secret_oLRl25mmUtTlGXnolrbiKhJzN"
      };
      return (
    <>
    <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
    </>
      )
}

export default Form