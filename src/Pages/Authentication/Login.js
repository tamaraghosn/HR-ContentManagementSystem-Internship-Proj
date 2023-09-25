import React, { useCallback, useState, useEffect } from "react";
import {
  AppProvider,
  Card,
  FormLayout,
  Button,
  Image,
  TextField,
  Link,
  Toast,
  Modal,
  Text,
} from "@shopify/polaris";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../../Assets/Images/logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setrPasswordError] = useState("");
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecaptchaChecked, setIsRecaptchaChecked] = useState(false);
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const handleEmailFieldChange = useCallback((value) => {
    setEmailValue(value);
    setEmailError("");
  }, []);
  const handlePasswordFieldChange = useCallback((value) => {
    setPasswordValue(value);
    setrPasswordError("");
  }, []);
  const toastMarkup = active ? (
    <Toast
      content="These credentials do not match our records."
      onDismiss={toggleActive}
    />
  ) : null;

  function onChange(value) {
    console.log(value);
    setCaptchaValue(value);
    setIsRecaptchaChecked(true);
    setError("");
  }

  useEffect(() => {
    console.log("rec=", process.env.REACT_APP_RECAPTCHA_KEY);
  }, []);

  return (
    <AppProvider>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Image src={logo} alt="Logo" />

        <div style={{ minWidth: 400, marginTop: 20 }}>
          <div style={{ marginBottom: 30 }}>
            <Text variant="heading2xl" as="h3">
              Login
            </Text>
          </div>

          <FormLayout>
            <Card sectioned>
              <FormLayout>
                <TextField
                  type="email"
                  label="Email"
                  value={emailValue}
                  onChange={handleEmailFieldChange}
                  error={emailError}
                />
                <div onKeyDown={handleKeyPress}>
                  <TextField
                    label="Password"
                    value={passwordValue}
                    onChange={handlePasswordFieldChange}
                    type="password"
                    error={passwordError}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                    onChange={onChange}
                  />
                </div>
                <Text variant="bodyMd" as="span" color="critical">
                  {error}
                </Text>
                <Button
                  fullWidth
                  primary
                  onClick={handleSignIn}
                  loading={isLoading}
                >
                  Sign in
                </Button>
                {/* <Link url="/forgotpassword">Forgot password?</Link> */}
              </FormLayout>
            </Card>
            <div>
              <div style={{ float: "left" }}>
                <p style={{ float: "left" }}>
                  {"© Copyright " +
                    new Date().getFullYear() +
                    " " +
                    process.env.REACT_APP_CLIENT_NAME}
                </p>
                <br />
              </div>
              <div style={{ float: "right" }}></div>
            </div>
          </FormLayout>
        </div>
        {toastMarkup}
      </div>
    </AppProvider>
  );

  function handleSignIn(e) {
    if (
      !emailValue ||
      (emailValue &&
        !emailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ||
      !passwordValue ||
      !isRecaptchaChecked
    ) {
      if (!emailValue) {
        setEmailError("Please enter your email");
      }
      if (
        emailValue &&
        !emailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ) {
        setEmailError("Please enter a valid email");
      }
      if (!passwordValue) {
        setrPasswordError("Please enter your password");
      }
      if (!isRecaptchaChecked) {
        setError("Please verify that you are not a robot.");
      }
    } else {
      setIsLoading(true);
      const form_data = new FormData();
      form_data.append("email", emailValue);
      form_data.append("password", passwordValue);
      form_data.append("g-recaptcha-response", captchaValue);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}login`, form_data)
        .then((res) => {
          console.log(res.data);
          Cookies.set("shift-management-password", passwordValue);
          Cookies.set(
            "shift-management-accesstoken",
            res.data.authorization.token,
            {
              expires: 7,
            }
          );
          res?.data?.user?.name &&
            Cookies.set("shift-management-name", res.data.user.name);
          navigate("admin/products");
        })
        .catch(function (error) {
          window.grecaptcha.reset();
          setIsRecaptchaChecked(false);
          setIsLoading(false);
          setError("Invalid email or password");
        });
    }
  }

  function toggleActive() {
    setActive((active) => !active);
  }
  function handleKeyPress(event) {
    const enterKeyPressed = event.keyCode === 13;
    if (enterKeyPressed) {
      handleSignIn();
    }
  }
}
export default Login;
