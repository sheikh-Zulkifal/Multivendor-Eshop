import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

function ActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const activationEmail = async () => {
      try {
        const res = await axios.post(`${server}/user/activation`, {
          activation_token,
        });
        // console.log(res.data.message);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
        setError(true);
      }
    };

    // 🔄 Call the function here, outside the definition block
    activationEmail();
  }, [activation_token]);

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

export default ActivationPage;
