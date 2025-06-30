import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage, ActivationPage } from "./Routes.js";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
