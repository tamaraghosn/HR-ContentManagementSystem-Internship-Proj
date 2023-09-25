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
import Cookies from "js-cookie";

function ForgotPassword() {
  const [emailFieldValue, setEmailFieldValue] = useState("");
  const [fieldRequiredE, setFieldRequiredE] = useState(
    <InlineError message="" fieldID="myFieldID" />
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value);
  }, []);
  const [popupActive, setPopupActive] = useState(false);
  const pageContent = isSuccess ? (
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
              Your password reset email has been sent
            </DisplayText>
            <Text>
              A reset password link has been generated and will be sent to you
              via email. You can then follow that link and select a new
              password.
            </Text>
          </FormLayout>
        </div>
      </div>
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
        width: "20%",
      }}
    >
      <div style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <FormLayout>
            <DisplayText size="large">Forgot Password?</DisplayText>
            <Text>We'll email you a link to reset it</Text>
          </FormLayout>
        </div>

        <Card sectioned>
          <FormLayout>
            <div>
              <TextField
                type="email"
                label="Email"
                value={emailFieldValue}
                onChange={handleEmailFieldChange}
              />
            </div>

            <Button fullWidth primary onClick={handleSend}>
              Send
            </Button>
            {fieldRequiredE}
          </FormLayout>
        </Card>
      </div>
      <Modal open={popupActive} loading={true}></Modal>
    </div>
  );

  return <AppProvider>{pageContent}</AppProvider>;

  function handleSend(e) {
    if (
      emailFieldValue != null &&
      !emailFieldValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      setFieldRequiredE(
        <InlineError message="Invalid email" fieldID="myFieldID" />
      );
    } else {
      setPopupActive(true);
      const bodyObj = {
        email: emailFieldValue,
        route: "http://localhost:3001/password/reset",
      };
      axios
        .post("/admin/reset-password/send-email", bodyObj)
        .then((res) => {
          setPopupActive(false);
          setIsSuccess(true);
        })
        .catch((err) => console.log(err));
    }
  }
}
export default ForgotPassword;
