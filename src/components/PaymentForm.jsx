import React from 'react';
import './PaymentForm.css'; // Import the PaymentForm CSS file

function PaymentForm({ totalAmount }) {
    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        // Handle the payment submission
        alert('Payment successfull');
    };

    return (
        <div className="payment-form-container">
            <h3>Payment Details </h3>
            <form onSubmit={handlePaymentSubmit}>
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Enter your card number"
                    required
                />

                <label htmlFor="cardHolderName">Cardholder Name:</label>
                <input
                    type="text"
                    id="cardHolderName"
                    name="cardHolderName"
                    placeholder="Enter cardholder name"
                    required
                />

                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                />

                <label htmlFor="cvv">CVV:</label>
                <input
                    type="number"
                    id="cvv"
                    name="cvv"
                    placeholder="Enter CVV"
                    required
                />

                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
}

export default PaymentForm;
