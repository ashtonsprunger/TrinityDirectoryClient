import React, { useState } from "react";
import "../CSS/Login.css";
import { Form, Input, Button } from "reactstrap";

const Login = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = "http://localhost:3000/login";
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  return (
    <Form className="loginForm">
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" onClick={handleSubmit}>
        Login!
      </Button>
    </Form>
  );
};

export default Login;
