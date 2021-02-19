import React,{useEffect , useState} from 'react'
import PaymentForm from './PaymentForm'
import  './Payment.css';
import instance from '../../Instance';

const Payment = () => {


    const [ load , setLoad] = useState(false)

    useEffect(() => {
        let sqPaymentScript = document.createElement("script");
        sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";
        sqPaymentScript.type = "text/javascript";
        sqPaymentScript.async = false;
        sqPaymentScript.onload = () => {
            setLoad(true)
          };
        document.getElementsByTagName("head")[0].appendChild(sqPaymentScript); 
    } , [])

    // const paymentForm = new SqPaymentForm({


    //     cardNumber: {
    //         elementId: 'sq-card-number',
    //         placeholder: 'Card Number'
    //     },
    //     cvv: {
    //         elementId: 'sq-cvv',
    //         placeholder: 'CVV'
    //     },
    //     expirationDate: {
    //         elementId: 'sq-expiration-date',
    //         placeholder: 'MM/YY'
    //     },
    //     postalCode: {
    //         elementId: 'sq-postal-code',
    //         placeholder: 'Postal'
    //     },
    //     // SqPaymentForm callback functions
    //     callbacks: {
    //         cardNonceResponseReceived: function (errors, nonce, cardData) {
   
   
    //            alert(`The generated nonce is:\n${nonce}`);
    //         }
    //     }
    //   });

      

    //   function onGetCardNonce(event) {
    //     paymentForm.requestCardNonce();
    //   }
 

    return (
       <>
            {load && <PaymentForm paymentForm={window.SqPaymentForm} />}
       </>
    )
}

export default Payment
