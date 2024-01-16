import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  PageActions,
} from "react";
import {
  AppProvider,
  ActionList,
  Card,
  TextField,
  Text,
  ContextualSaveBar,
  FormLayout,
  Modal,
  Frame,
  Layout,
  Loading,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Toast,
  TopBar,
  List,
} from "@shopify/polaris";
import {
  LogOutMinor,
  CustomersMajor,
  ProductsMajor,
  CardReaderChipMajor,
  CategoriesMajor,
  ListMajor,
  AppsFilledMajor,
} from "@shopify/polaris-icons";
import Cookies from "js-cookie";
import logoImg from "../Assets/Images/logoWhite.svg";
import { useNavigate } from "react-router-dom";
import axios from "../Assets/Lib/axios";

function NavigationLayout(props) {
  // const iconContent = () => {
  //   return (
  //     <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  //       <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
  //       <circle cx="10" cy="10" r="6" fill="currentColor" />
  //       <circle cx="10" cy="10" r="3" />
  //     </svg>
  //   );
  // };
  const navigate = useNavigate();
  const defaultState = useRef({
    emailFieldValue: "dharma@jadedpixel.com",
    nameFieldValue: "Jaded Pixel",
  });
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue
  );
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const handleSubjectChange = useCallback(
    (value) => setSupportSubject(value),
    []
  );
  const handleMessageChange = useCallback(
    (value) => setSupportMessage(value),
    []
  );
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;

    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue("");
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    []
  );
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    []
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    // {
    //   items: [
    //     {
    //       content: "Your profile",
    //       icon: ProfileMinor,
    //       onAction: () => navigate("/profile"),
    //     },
    //   ],
    // },
    {
      items: [
        {
          content: "Log out",
          icon: LogOutMinor,

          onAction: () => {
            axios
              .post(`/logout`)
              .then((result) => {
                Cookies.set("shift-management-accesstoken", null);
                navigate("/");
              })
              .catch((err) => console.log(err));
          },
        },
      ],
    },
  ];
  const customIcon = {
    viewBox: "0 0 20 20",
    body: '<g transform="scale(0.5)"><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></g>',
  };
  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={
        Cookies.get("shift-management-name") &&
        Cookies.get("shift-management-name")
      }
      initials={
        Cookies.get("shift-management-name") &&
        Cookies.get("shift-management-name").split(" ")[0].charAt(0) +
          " " +
          Cookies.get("shift-management-name").split(" ")[1].charAt(0)
      }
      //  detail="Jaded Pixel"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      // searchResultsVisible={searchActive}
      // searchField={searchFieldMarkup}
      // searchResults={searchResultsMarkup}
      // onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
      logoSuffix
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: "/",
            onClick: () => navigate("/admin/employees"),
            label: "Employees",
            icon: CustomersMajor,
            selected: window.location.href.indexOf("/admin/employees") > -1,
          },
          {
            url: "/",
            onClick: () => navigate("/admin/departments"),
            label: "Departments",
            icon: CategoriesMajor,
            selected: window.location.href.indexOf("/admin/departments") > -1,
          },
          {
            url: "/",
            onClick: () => navigate("/admin/specialities"),
            label: "Specialities",
            icon: AppsFilledMajor,
            selected: window.location.href.indexOf("/admin/specialities") > -1,
          },
          {
            url: "/",
            onClick: () => navigate("/admin/job-titles"),
            label: "Job Titles",
            icon: ProductsMajor,
            selected: window.location.href.indexOf("/admin/job-titles") > -1,
          },
          {
            url: "/",
            onClick: () => navigate("/admin/employment-types"),
            label: "Employment Types",
            icon: ListMajor,
            selected:
              window.location.href.indexOf("/admin/employment-types") > -1,
          },
          {
            url: "/",
            onClick: () => navigate("/admin/interns"),
            label: "Interns",
            icon: CardReaderChipMajor,
            selected: window.location.href.indexOf("/admin/interns") > -1,
          },
        ]}
      ></Navigation.Section>
      {/* <Navigation.Section
        separator
        items={[
          {
            icon: SettingsMajor,
            label: "Settings",
            url: "/admin/settings",
            selected:
              window.location.href.indexOf("/admin/settings") > -1 && true,
          },
        ]}
      /> */}
    </Navigation>
  );
  const loadingMarkup = isLoading ? <Loading /> : null;

  const skipToContentTarget = (
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  );

  const actualPageMarkup = (
    <Page title="Account">
      <Layout>
        {skipToContentTarget}
        <Layout.AnnotatedSection
          title="Account details"
          description="Jaded Pixel will use this as your account information."
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Full name"
                value={nameFieldValue}
                onChange={handleNameFieldChange}
              />
              <TextField
                type="email"
                label="Email"
                value={emailFieldValue}
                onChange={handleEmailFieldChange}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Contact support"
      primaryAction={{
        content: "Send",
        onAction: toggleModalActive,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={handleSubjectChange}
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );

  const theme = {
    colors: {
      surface: "#FFFFFF",
      onsurface: "#212B36",
    },
  };
  const logo = {
    width: 150,

    topBarSource: logoImg,
    // url: "/admin/employees",
    // accessibilityLabel: "Jaded Pixel",
  };

  return (
    <div style={{ height: "500px" }}>
      <AppProvider
        // theme={theme}
        i18n={{
          Polaris: {
            Avatar: {
              label: "Avatar",
              labelWithInitials: "Avatar with initials {initials}",
            },
            ContextualSaveBar: {
              save: "Save",
              discard: "Discard",
            },
            TextField: {
              characterCount: "{count} characters",
            },
            TopBar: {
              toggleMenuLabel: "Toggle menu",

              SearchField: {
                clearButtonLabel: "Clear",
                search: "Search",
              },
            },
            Modal: {
              iFrameTitle: "body markup",
            },
            Frame: {
              skipToContent: "Skip to content",
              Navigation: {
                closeMobileNavigationLabel: "Close navigation",
              },
            },
          },
        }}
      >
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
          skipToContentTarget={skipToContentRef.current}
          logo={logo}
        >
          {props.children}
        </Frame>
      </AppProvider>
    </div>
  );
}
export default React.memo(NavigationLayout);
