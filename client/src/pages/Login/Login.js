import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import Axios from "axios";
import Cookies from "js-cookie";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Login form submitted: email=${email}, password=${password}`);
    const loginData = {
      email: email,
      password: password,
    };
    const responseLogin = await Axios.post(
      "http://localhost:3000/auth/login",
      loginData
    );
    const token = responseLogin.data.accessToken;
    console.log("Lprint:", token);
    Cookies.set("token", token);
    // console.log("fromtoken:", Cookies.get("token"));
    window.location.href = "/";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Login</Button>
      <a href="#" className="ml-2">
        Forgot Password?
      </a>
    </Form>
  );
}

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signupData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: "1234567890",
    };

    console.log(signupData);
    const response = await Axios.post(
      "http://localhost:3000/auth/signup",
      signupData
    );
    const token = response.data.token;
    console.log("print:", token);
    Cookies.set("token", token);
    // console.log("fromtoken:", Cookies.get("token"));
    window.location.href = "/";

    // Cookies.set("token", response.data.token);

    // window.location.href = "/";
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <Form.Group controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
}

function LoginSignupPage() {
  return (
    <div className="login-signup-container">
      <div className="login-box">
        <LoginForm />
      </div>
      <div className="signup-box">
        <SignupForm />
      </div>
    </div>
  );
}

export default LoginSignupPage;
