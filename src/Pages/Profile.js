import React, { useState, useCallback, useEffect } from "react";
import {
  Layout,
  Card,
  FormLayout,
  TextField,
  Page,
  Toast,
  Text,
  PageActions,
  Loading,
  Button,
  Inline,
  InlineError,
} from "@shopify/polaris";
import axios from "../Assets/Lib/axios";
import NavigationLayout from "../Components/NavigationLayout";
import history from "./../Assets/Lib/history";

export default function Profile() {
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [toastMsg, setToastMsg] = useState("");
  const [isSaving, setIsSaving] = useState(true);
  const toastMarkup = active ? (
    <Toast content={toastMsg} onDismiss={toggleActive} />
  ) : null;
  const handleChangeFirstName = (newValue) => {
    setItem({ ...item, name: newValue });
  };
  const handleChangeLastName = useCallback((newValue) => {
    setLastNameValue(newValue);
  }, []);

  const handleChangeEmailValue = (newValue) => {
    setItem({ ...item, email: newValue });
  };
  const handleChangeNewPasswordValue = useCallback((newValue) => {
    setNewPasswordValue(newValue);
    setPasswordsError("");
    setNewPasswordError("");
  }, []);
  const handleChangeConfirmPasswordValue = useCallback((newValue) => {
    setConfirmPasswordValue(newValue);
    setConfirmPasswordError("");
    setPasswordsError("");
  }, []);
  const [passwordsError, setPasswordsError] = useState("");
  const [showServerErrorToast, setSetShowServerErrorToast] = useState(false);
  const [item, setItem] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    axios
      .get("profile")
      .then((result) => {
        setItem({
          name: result?.data?.name ? result?.data?.name : "",
          email: result?.data?.email ? result?.data?.email : "",
        });
        setIsSaving(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <NavigationLayout>
      <Page>
        {isSaving ? <Loading /> : null}
        <Layout>
          <Layout.AnnotatedSection title="Account Information" description="">
            <Card>
              <Card.Section title="Details">
                <FormLayout>
                  <FormLayout.Group condensed>
                    <FormLayout>
                      <TextField
                        value={item.name}
                        label="Name"
                        onChange={handleChangeFirstName}
                      />
                    </FormLayout>
                    <FormLayout>
                      <TextField
                        value={item.email}
                        label="Email"
                        onChange={handleChangeEmailValue}
                        disabled
                      />
                    </FormLayout>
                    {/* <FormLayout>
                      <TextField
                        value={lastNameValue}
                        label="Last Name"
                        onChange={handleChangeLastName}
                      />
                    </FormLayout> */}
                  </FormLayout.Group>
                  {/* <FormLayout.Group condensed>
                    <FormLayout>
                      <TextField
                        value={emailValue}
                        label="Email"
                        onChange={handleChangeEmailValue}
                        disabled
                      />
                    </FormLayout>
                  </FormLayout.Group> */}
                  {/* <Button primary onClick={handleSave} loading={isSaving}>
                    Save
                  </Button> */}
                </FormLayout>
              </Card.Section>

              <Card.Section title="Change Password">
                <FormLayout>
                  <Text>
                    {`Change the password you use to login to ${process.env.REACT_APP_CLIENT_NAME}`}
                  </Text>
                  <FormLayout>
                    <FormLayout.Group condensed>
                      <TextField
                        value={newPasswordValue}
                        label="New Password"
                        onChange={handleChangeNewPasswordValue}
                        error={newPasswordError}
                        helpText="Password must contain at least 6 characters"
                      />
                      <TextField
                        value={confirmPasswordValue}
                        label="Confirm Password"
                        onChange={handleChangeConfirmPasswordValue}
                        error={confirmPasswordError}
                      />
                    </FormLayout.Group>
                    {/* <Button
                      primary
                      onClick={handleResetPassword}
                      loading={isSaving}
                    >
                      Reset Password
                    </Button> */}
                  </FormLayout>
                  <InlineError message={passwordsError} />
                </FormLayout>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
        <PageActions
          primaryAction={{
            content: "Save",
            onClick: handleSave,
            loading: isSaving && true,
          }}
        />
        {toastMarkup}
      </Page>
    </NavigationLayout>
  );

  function handleSave() {
    if (
      newPasswordValue !== confirmPasswordValue ||
      (newPasswordValue.length < 6 && newPasswordValue)
    ) {
      newPasswordValue !== confirmPasswordValue &&
        setPasswordsError("Passwords do not match");
      newPasswordValue.length < 6 &&
        newPasswordValue &&
        setNewPasswordError("Passwords must be at least 6 characters");
    } else {
      setIsSaving(true);
      const form_data = new FormData();
      // firstNameValue && form_data.append("_method", "PATCH");
      item.name && form_data.append("name", item.name);
      newPasswordValue && form_data.append("password", newPasswordValue);
      confirmPasswordValue &&
        form_data.append("confirm-password", confirmPasswordValue);

      axios
        .post("profile", form_data)
        .then((res) => {
          setToastMsg("Your profile has been updated successfully");
          toggleActive();
          setIsSaving(false);
          newPasswordValue && history.push("/");
        })
        .catch(function (error) {
          // if (error.response) {
          //   error.response.status === 500 && setSetShowServerErrorToast(true);
          // }
        });
    }
  }
}
