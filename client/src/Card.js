import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AddCard from './AddCard';


const Card = ()=>{
    const stripePromise = loadStripe('pk_test_51L4HYSSENL3MHdtsuslXVbaX1Rk8f4BDTMUx3rTEkU2OrhN7wnH2siVwfzTM7Wpy7WOfvvVgeGDw5QNDZOjptneO00ZqnOA51t');

    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_3OJbpfSENL3MHdts1VEGaKiO_secret_7DRy8ANyUElsdIgY3BxPwzJ2L',
      };
      return (
    <>
    <Elements stripe={stripePromise}>
          <AddCard />
        </Elements>
    </>
      )
}

export default Card