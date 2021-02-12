import React from 'react'
import { Typography, Button, Divider} from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import emailjs from 'emailjs-com'
import {ContactForm} from '../Email/ContactForm'

import Review from './Review'

const stripePromise = loadStripe('pk_test_51IIwGsJzeFsgSEwcJU0WnPwIz56wTx39wf4oxAbcHC3QZdxvAK4Kc8AxCgJibjtf66UiCqbBzinZ5QCUURPKkDhA00V60ZQeeK')

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout , nextStep, timeout}) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement)

        const {error, paymentMethod} = await stripe.createPaymentMethod({ type: 'card', card: cardElement})

        if(error){
            console.log(error)
        }else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                  gateway: 'stripe',
                  stripe: {
                    payment_method_id: paymentMethod.id,
                  },
                },
              };

            onCaptureCheckout(checkoutToken.id, orderData)
            timeout()
            nextStep()
        }
    }

    const sendEmail = () => {
        emailjs.send('service_0d9qh7m', 'template_wsfhg4i',{firstName:shippingData.firstName, subject: 'Pedido', message: 'Muchas gracias por su compra' } , 'user_Vg5JSIPncMuVbKY1zOgQG')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }

    const handleFinished = (event) => {
        event.preventDefault();
        // sendEmail()
        // window.open(`https://wa.me/+'1553190257'?text='HolaDePrueba'`, '_blank');
        onCaptureCheckout(checkoutToken.id, "orderData")
        timeout()
        nextStep()
    }

    return (
        <>
            <Review checkoutToken={checkoutToken}> </Review>
            <Divider />
            {/* <Typography variant="h6" gutterBottom style={{ margin: '20px 0'}}>Payment method</Typography> */}
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={handleFinished}>
                            <br /> <br/>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay { checkoutToken.live.subtotal.formatted_with_symbol }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
