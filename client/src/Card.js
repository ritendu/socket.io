import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AddCard from './AddCard';
const Card = ()=>{
    const stripePromise = loadStripe('pk_test_51L4HYSSENL3MHdtsuslXVbaX1Rk8f4BDTMUx3rTEkU2OrhN7wnH2siVwfzTM7Wpy7WOfvvVgeGDw5QNDZOjptneO00ZqnOA51t');

    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_3OI9NASENL3MHdts1IkNHxJz_secret_t5AKHoYEgLcbj6sYLz5N7UBJS',
      };
      return (
    <>
    <Elements stripe={stripePromise} options={options}>
          <AddCard />
        </Elements>
    </>
      )
}

export default Card