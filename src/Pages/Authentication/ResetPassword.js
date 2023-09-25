import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  AppProvider,
  Card,
  FormLayout,
  Button,
  Page,
  InlineError,
  DisplayText,
  Image,
  TextField,
  Link,
  Toast,
  Frame,
  Text,
  Modal,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios.js";
import history from "../../Assets/Lib/history";
import Cookies from "js-cookie";

function ResetPassword() {
  var url = window.location;
  var token = new URLSearchParams(url.search).get("token");
  var email = new URLSearchParams(url.search).get("email");
  const [passwordFieldValue, setPasswordFieldValue] = useState("");
  const [confirmPasswordFieldValue, setConfirmPasswordFieldValue] =
    useState("");
  const [isSuccess, setIsSuccess] = useState("false");
  const handlePasswordChange = useCallback((value) => {
    setPasswordFieldValue(value);
  }, []);
  const handleConfirmPasswordChange = useCallback((value) => {
    setConfirmPasswordFieldValue(value);
  }, []);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    axios
      .get("admin/reset-password/find", { token: token })
      .then((result) => {
        setIsSuccess("true");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppProvider>
      {isSuccess === "true" ? (
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
          <div style={{ minWidth: 400, marginTop: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <FormLayout>
                <DisplayText size="large">Reset Password</DisplayText>
                <Text>Please enter a new password</Text>
              </FormLayout>
            </div>

            <Card sectioned>
              <FormLayout>
                <TextField
                  label="New Password"
                  value={passwordFieldValue}
                  onChange={handlePasswordChange}
                  helpText="The password must be at least 6 characters."
                  error={passwordError}
                />
                <TextField
                  label="Verify Password"
                  value={confirmPasswordFieldValue}
                  onChange={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                />
                <Button fullWidth primary onClick={handleResetPasssword}>
                  Reset Password
                </Button>
              </FormLayout>
            </Card>
          </div>
          <Modal open={popupActive} loading={true}></Modal>
        </div>
      ) : (
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
          <div style={{ minWidth: 400, marginTop: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <FormLayout>
                <DisplayText size="large">
                  Your password has been reset.
                </DisplayText>
                <Text>Click Log In to sign in using your new password</Text>
                <Button fullWidth primary onClick={handleSignIn}>
                  Sign in
                </Button>
              </FormLayout>
            </div>
          </div>
          <Modal open={popupActive} loading={true}></Modal>
        </div>
      )}
    </AppProvider>
  );

  function handleResetPasssword(e) {
    const bodyObj = {
      email: email,
      token: token,
      password: passwordFieldValue,
      password_confirmation: confirmPasswordFieldValue,
    };
    if (
      passwordFieldValue !== confirmPasswordFieldValue ||
      passwordFieldValue.length < 6
    ) {
      passwordFieldValue !== confirmPasswordFieldValue &&
        setconfirmPasswordError("Please make sure your passwords match");
      passwordFieldValue.length < 6 &&
        setPasswordError("The password must be at least 6 characters.");
    } else {
      axios
        .post("/admin/reset-password/reset", bodyObj)
        .then((res) => {
          setPopupActive(false);
          setIsSuccess(true);
        })
        .catch((err) => setPopupActive(false));
    }
  }

  function handleSignIn(e) {
    history.push("/");
  }
}

export default ResetPassword;
