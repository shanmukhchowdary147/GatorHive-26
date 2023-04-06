import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import Axios from "axios";
import Cookies from "js-cookie";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,256}$/;
    setIsValid(regex.test(value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if(password)
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
          onChange={handlePasswordChange}
          required
        />
      </Form.Group>
      {!isValid && (
        <Form.Text className="text-danger">Invalid Email or Password</Form.Text>
      )}
      <Button type="submit" disabled={!isValid}>
        Login
      </Button>
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
  const [isValid, setIsValid] = useState(false);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    setIsValid(regex.test(value));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="xxx">
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
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>
        {!isValid && (
          <div className="password-validation">
            <p> Minimum 8 characters </p>
            <p> 1 capital letter, 1 small letter </p>
            {/* <p>  </p> */}
            <p> 1 special character, 1 number </p>
            {/* <p> 1 special character</p> */}
          </div>
        )}
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </Form.Group>
        {password !== confirmPassword && (
          <div style={{ color: "red" }}>Passwords do not match!</div>
        )}
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
