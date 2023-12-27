import React, { useState } from "react";
import axios from "axios"
import Script from "react-load-script";
import "./App.css";

const PUBLIC_KEY_DEMO = "pkey_test_5x6z2poriuh0aisxnp2";
let OmiseCard
const API_URL = "http://localhost:3323/api/demo/purchase";

export default function CreditCard() {
    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey: PUBLIC_KEY_DEMO,
            currency: 'THB',
            frameLabel: 'Borntodev Shop',
            submitLabel: 'Pay NOW',
            buttonLabel: 'Pay with Omise'
   });
}

const creditCardConfigure = () => {
    OmiseCard.configure({
        defaultPaymentMethod: 'credit_card',
        otherPaymentMethods: []
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
}

const omiseCardHandler = () => {
  OmiseCard.open({
      amount: "100000",
      onCreateTokenSuccess: (token) => {
        console.log(token)
        axios.post(API_URL, {
              email: "pcsishun@gmail.com",
              name: 'pcsishun',
              amount: "100000",
              token: token,
              headers: {
                  "Content-Type": "application/json"
              }
          }).then((payload) => {
            console.log(payload)
          })
      },
      onFormClosed: () => { },
})
}

const handleClick = (e) => {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
}


return (
    <div className="own-form">
        <Script
            url="https://cdn.omise.co/omise.js"
            onLoad={handleLoadScript}
        />
        <form className="set-form">
            <div
              className="btn-container"
              id="credit-card"
              type="button"
              onClick={handleClick}

            >
                ชำระเงินด้วยบัตรเครดิต
            </div>
        </form>
    </div>
 )
}