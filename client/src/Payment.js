import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      //console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
     
      body: JSON.stringify({
        
      }),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      console.log(result)
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && 
      (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )
      }
    </>
  );
}

export default Payment;
