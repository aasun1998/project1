import React,{useState, useEffect} from 'react'
import './Payment.css'


const styles = {
    name: {
      verticalAlign: "top",
      display: "none",
      margin: 0,
      border: "none",
      fontSize: "16px",
      fontFamily: "Helvetica Neue",
      padding: "16px",
      color: "#373F4A",
      backgroundColor: "transparent",
      lineHeight: "1.15em",
      placeholderColor: "#000",
      _webkitFontSmoothing: "antialiased",
      _mozOsxFontSmoothing: "grayscale"
    },
    leftCenter: {
      float: "left",
      textAlign: "center"
    },
    blockRight: {
      display: "block",
      float: "right"
    },
    center: {
      textAlign: "center"
    }
  };

const PaymentForm = ({paymentForm}) => {


    const [details , setDetails] = useState({
        cardBrand: "",
      nonce: undefined,
      googlePay: false,
      applePay: false,
      masterpass: false
    })
    const  requestCardNonce=()=> {
        paymentForm.requestCardNonce();
      }
    useEffect(() => {
        const config = {
            applicationId: "sandbox-sq0idb-Wnu1hadK14pCrx319c7cyg",
            locationId: "LWRZPAFZ2N5KN",
            inputClass: "sq-input",
            autoBuild: false,
            inputStyles: [
              {
                fontSize: "16px",
                fontFamily: "Helvetica Neue",
                padding: "16px",
                color: "#373F4A",
                backgroundColor: "transparent",
                lineHeight: "1.15em",
                placeholderColor: "#000",
                _webkitFontSmoothing: "antialiased",
                _mozOsxFontSmoothing: "grayscale"
              }
            ],
            applePay: {
              elementId: "sq-apple-pay"
            },
            masterpass: {
              elementId: "sq-masterpass"
            },
            googlePay: {
              elementId: "sq-google-pay"
            },
            cardNumber: {
              elementId: "sq-card-number",
              placeholder: "• • • •  • • • •  • • • •  • • • •"
            },
            cvv: {
              elementId: "sq-cvv",
              placeholder: "CVV"
            },
            expirationDate: {
              elementId: "sq-expiration-date",
              placeholder: "MM/YY"
            },
            postalCode: {
              elementId: "sq-postal-code",
              placeholder: "Zip"
            },
            callbacks: {
              methodsSupported: methods => {
                if (methods.googlePay) {
                  
                  setDetails({
                      ...details ,
                      googlePay: methods.googlePay
                  })
                }
                if (methods.applePay){

                  setDetails({
                    ...details ,
                    applePay: methods.applePay
                })
                }
                if (methods.masterpass) {
                 
                  setDetails({
                    ...details ,
                    masterpass: methods.masterpass
                })
                  
                }
                return;
              },
              createPaymentRequest: () => {
                return {
                  requestShippingAddress: false,
                  requestBillingInfo: true,
                  currencyCode: "USD",
                  countryCode: "US",
                  total: {
                    label: "MERCHANT NAME",
                    amount: "100",
                    pending: false
                  },
                  lineItems: [
                    {
                      label: "Subtotal",
                      amount: "100",
                      pending: false
                    }
                  ]
                };
              },
              cardNonceResponseReceived: (errors, nonce, cardData) => {
                if (errors) {
                  // Log errors from nonce generation to the Javascript console
                  console.log("Encountered errors:");
                  errors.forEach(function(error) {
                    console.log("  " + error.message);
                  });
      
                  return;
                }
            
                setDetails({
                    ...details,
                    nonce: nonce
                })
              },
              unsupportedBrowserDetected: () => {},
              inputEventReceived: inputEvent => {
                switch (inputEvent.eventType) {
                  case "focusClassAdded":
                    break;
                  case "focusClassRemoved":
                    break;
                  case "errorClassAdded":
                    document.getElementById("error").innerHTML =
                      "Please fix card information errors before continuing.";
                    break;
                  case "errorClassRemoved":
                    document.getElementById("error").style.display = "none";
                    break;
                  case "cardBrandChanged":
                    if (inputEvent.cardBrand !== "unknown") {
                     
                      setDetails({
                          ...details,
                          cardBrand: inputEvent.cardBrand
                      })
                    } else {
                

                      setDetails({
                        ...details,
                        cardBrand: ""
                    })
                    }
                    break;
                  case "postalCodeChanged":
                    break;
                  default:
                    break;
                }
              },
              paymentFormLoaded: function() {
                document.getElementById("name").style.display = "inline-flex";
              }
            }
          };
          paymentForm = new paymentForm(config);
          paymentForm.build();


    },[])

    return (
        <div className="container">
        <div id="form-container">
          <div id="sq-walletbox">
            <button
              style={{ display: details.applePay ? "inherit" : "none" }}
              className="wallet-button"
              id="sq-apple-pay"
            />
            <button
              style={{ display: details.masterpass ? "block" : "none" }}
              className="wallet-button"
              id="sq-masterpass"
            />
            <button
              style={{ display: details.googlePay ? "inherit" : "none" }}
              className="wallet-button"
              id="sq-google-pay"
            />
            <hr />
          </div>

          <div id="sq-ccbox">
            <p>
              <span style={styles.leftCenter}>Enter Card Info Below </span>
              <span style={styles.blockRight}>
                {details.cardBrand.toUpperCase()}
              </span>
            </p>
            <div id="cc-field-wrapper">
              <div id="sq-card-number" />
              <input type="hidden" id="card-nonce" name="nonce" />
              <div id="sq-expiration-date" />
              <div id="sq-cvv" />
            </div>
            <input
              id="name"
              style={styles.name}
              type="text"
              placeholder="Name"
            />
            <div id="sq-postal-code" />
          </div>
          <button
            className="button-credit-card"
            onClick={requestCardNonce}
          >
            Pay
          </button>
        </div>
        <p style={styles.center} id="error" />
      </div>
    )
}

export default PaymentForm
