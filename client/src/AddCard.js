import {useStripe, useElements, CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  LinkAuthenticationElement,
  AddressElement,
  PaymentElement,
  CardElement,} from '@stripe/react-stripe-js';
  import { useMemo } from 'react';
const AddCard = ()=>{
    const stripe = useStripe();
  const elements = useElements();
  const useOptions = () => {
    const options = useMemo(
      () => ({
        style: {
          base: {
            height: '1.0em !important',
            fontSize: "14px",
            family: 'AvenirRoman',
            src: 'url(/avenirroman.ttf)',
            fontWeight: '200',
            "::placeholder": {
              color: "#33353A",
            }
          },
          invalid: {
            color: "#c23d4b"
          }
        },
      }),
      []
    );
    return options;
  };
  const useCardOption = () => {
    const options = useMemo(
      () => ({
        style: {
          base: {
            height: '1.0em !important',
            fontSize: "14.8px",
            family: 'AvenirRoman',
            src: 'url(/avenirroman.ttf)',
            fontWeight: '200',
            "::placeholder": {
              color: "#33353A",
            }
          },
          invalid: {
            color: "#c23d4b"
          }
        },
        placeholder: "Card Number",
      }),
      []
    );
    return options;
  };

  const createOptions = useOptions();
  const cardoptions = useCardOption();
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
const addressElement = elements.getElement('address');

const {complete, value} = await addressElement.getValue();
console.log(value,"value")
const { token, error } = await stripe.createToken(elements.getElement(elements));
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
     {/* <CardElement/> */}
     <LinkAuthenticationElement
            // Access the email value like so:
            // onChange={(event) => {
            //  setEmail(event.value.email);
            // }}
            //
            // Prefill the email field like so:
            // options={{defaultValues: {email: 'foo@bar.com'}}}
          />

          <h3>Shipping address</h3>
          <AddressElement
            options={{mode: 'billing'}}

            // Access the address like so:
            // onChange={(event) => {
            //   setAddressState(event.value);
            // }}
          />
          <h3>Payment Details</h3>
          <PaymentElement/>
     {/* <div>
     <CardNumberElement options={cardoptions}/>
     </div>
     <div>
     <CardCvcElement options={createOptions}/>
     </div>
     <div>
     <CardExpiryElement options={createOptions}/>
     </div> */}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    )
}

export default AddCard