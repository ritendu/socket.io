import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AddCard from './AddCard';
import Subscription from './Subscription';
import Confirm from './Confirm';
const AddSubscription = ()=>{
    const stripePromise = loadStripe('pk_test_51L4HYSSENL3MHdtsuslXVbaX1Rk8f4BDTMUx3rTEkU2OrhN7wnH2siVwfzTM7Wpy7WOfvvVgeGDw5QNDZOjptneO00ZqnOA51t');

    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_3OJZxzSENL3MHdts1eT897mk_secret_5rJnP0e1NYofaERn7CtOcLCfT',
      };
      return (
    <>
    <Elements stripe={stripePromise} options={options}>
        <Subscription/>
        {/* <Confirm/> */}
        </Elements>
    </>
      )
}

export default AddSubscription