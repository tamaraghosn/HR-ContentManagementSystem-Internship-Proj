import React, { useState, useCallback, useEffect } from "react";
import NavigationLayout from "../Components/NavigationLayout";
import {
  Page,
  Layout,
  FormLayout,
  Card,
  Loading,
  Text,
  TextField,
  DropZone,
  Thumbnail,
  PageActions,
  Stack,
  Caption,
  Button,
  Toast,
} from "@shopify/polaris";
import axios from "../Assets/Lib/axios";
import TagsInput from "react-tagsinput";
import history from "./../Assets/Lib/history";

const Settings = () => {
  const [isSaving, setIsSaving] = useState(true);
  const [twitterValue, setTwitterValue] = useState("");
  const handleChangeTwitter = useCallback(
    (newValue) => setTwitterValue(newValue),
    []
  );
  const [facebookValue, setFacebookValue] = useState("");
  const handleChangeFacebook = useCallback(
    (newValue) => setFacebookValue(newValue),
    []
  );
  const [googleValue, setGoogleValue] = useState("");
  const handleChangeGoogle = useCallback(
    (newValue) => setGoogleValue(newValue),
    []
  );
  const [contactEmailValue, setContactEmailValue] = useState("");
  const handleChangeContactEmail = useCallback(
    (newValue) => setContactEmailValue(newValue),
    []
  );
  const [metaTitleValue, setMetaTitleValue] = useState("");
  const handleChangeMetaTitle = useCallback(
    (newValue) => setMetaTitleValue(newValue),
    []
  );
  const [metaDescriptionValue, setMetaDescriptionValue] = useState("");
  const handleChangeMetaDescription = useCallback(
    (newValue) => setMetaDescriptionValue(newValue),
    []
  );
  const [tagsKeywords, setTagsKeywords] = useState([]);
  const handleChangeTagsKeywords = (tagsKeywords) => {
    console.log(tagsKeywords);
    setTagsKeywords(tagsKeywords);
  };
  const [imagePreview, setImagePreview] = useState("");
  const [files, setFiles] = useState([]);
  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  const fileUpload = !files.length && <DropZone.FileUpload />;
  let uploadedFiles = files.length > 0 && (
    <Stack alignment="center">
      <Thumbnail
        size="small"
        alt={files[files.length - 1].name}
        source={
          validImageTypes.indexOf(files[files.length - 1].type) > 0
            ? window.URL.createObjectURL(files[files.length - 1])
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
      />
      <div>
        {files[files.length - 1].name}{" "}
        <Caption>{files[files.length - 1].type} bytes</Caption>
      </div>
    </Stack>
  );
  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    []
  );
  const sendImage = useCallback(
    (files) => {
      setImagePreview(
        validImageTypes.indexOf(files[files.length - 1].type) > 0
          ? window.URL.createObjectURL(files[files.length - 1])
          : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
      );
    },

    [files]
  );
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast content="Settings saved" onDismiss={toggleActive} />
  ) : null;
  useEffect(() => {
    axios
      .get("admin/v1/settings")
      .then((result) => {
        setIsSaving(false);
        result?.data?.data?.meta_data?.title &&
          setMetaTitleValue(result.data.data.meta_data.title);
        result?.data?.data?.meta_data?.description &&
          setMetaDescriptionValue(result.data.data.meta_data.description);
        result?.data?.data?.meta_data?.image &&
          setImagePreview(
            process.env.REACT_APP_BASE_URL + result.data.data.meta_data.image
          );
        result?.data?.data?.meta_data?.keywords &&
          setTagsKeywords(result.data.data.meta_data.keywords.split(","));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <NavigationLayout>
      <Page title="Settings">
        {isSaving ? <Loading /> : null}
        <Layout>
          <Layout.AnnotatedSection title="Meta data">
            <Card sectioned>
              <FormLayout>
                <TextField
                  value={metaTitleValue}
                  onChange={handleChangeMetaTitle}
                  label="Title"
                />
                <TextField
                  value={metaDescriptionValue}
                  onChange={handleChangeMetaDescription}
                  label="Description"
                />
                <Text>Keywords</Text>

                <TagsInput
                  value={tagsKeywords}
                  onChange={handleChangeTagsKeywords}
                />

                <Text>Image</Text>
                <Thumbnail size="large" source={imagePreview} />
                <DropZone
                  onDrop={handleDropZoneDrop}
                  onDropAccepted={sendImage}
                >
                  {uploadedFiles}
                  {fileUpload}
                </DropZone>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          {/* <Layout.AnnotatedSection title="Admin Users">
            <Card sectioned>
              <Button onClick={() => history.push("/admin/admin-users")}>
                Manage Admin Users
              </Button>
            </Card>
          </Layout.AnnotatedSection> */}
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
    setIsSaving(true);
    const form_data = new FormData();

    metaTitleValue && form_data.append("meta_data[title]", metaTitleValue);
    metaDescriptionValue &&
      form_data.append("meta_data[description]", metaDescriptionValue);
    files[files.length - 1] &&
      form_data.append("meta_data[image]", files[files.length - 1]);
    tagsKeywords &&
      form_data.append("meta_data[keywords]", tagsKeywords.join());

    axios
      .post("admin/v1/settings", form_data)
      .then((res) => {
        setActive(true);
        setIsSaving(false);
      })
      .catch((err) => console.log(""));
  }
};

export default Settings;
