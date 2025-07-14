import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

function SellerActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const activationEmail = async () => {
      try {
        const res = await axios.post(`${server}/shop/activation`, {
          activation_token,
        });
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
        setError(true);
      }
    };

    activationEmail();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
}

export default SellerActivationPage;
