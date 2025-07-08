import axios from "axios";
import { loadRazorpay } from "./utils/razorpay";
import { useAuth } from "@clerk/clerk-react";

const PaymentButton = ({ amount }) => {
  const { getToken } = useAuth();
  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const token = await getToken();
    console.log(token)

    const { data } = await axios.post(
      "http://localhost:8000/create-order/",
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const options = {
      key: data.razorpay_key,
      amount: data.amount,
      currency: "INR",
      name: "Your Store",
      description: "Payment for order",
      order_id: data.order_id,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(
            "http://localhost:8000/verify-payment/",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          alert("Payment Verified");
        } catch (err) {
          alert("Payment Verification Failed");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default PaymentButton;
