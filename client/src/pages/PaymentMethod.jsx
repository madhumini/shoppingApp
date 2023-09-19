import React, { useState } from 'react'
import { styled } from 'styled-components'

const Container = styled.div``;
const H1 = styled.h1``;
const Form = styled.form``;
const Check = styled.check``;
const Button = styled.button``;

const PaymentMethod = () => {

    const [paymentMethods,setPaymentMethods] = useState("");
    const submitHandler = (e)=>{
        e.preventDefault();
    }
  return (
    <Container>

        <H1>Payment method</H1>
        <Form onSubmit={submitHandler}>
            <Check type="radio" id="PayPal" label="Paypal" value="Paypal" checked={paymentMethods === 'PayPal'} onChange={(e)=> setPaymentMethods(e.target.value)}/>
            <Check type="radio" id="Stripe" label="Stripe" value="Stripe" checked={paymentMethods === 'Stripe'} onChange={(e)=> setPaymentMethods(e.target.value)}/>

        </Form>
        <Button type="submit">Continue</Button>
    </Container>
  )
}

export default PaymentMethod