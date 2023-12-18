import { Card, Tabs, Page } from "@shopify/polaris";
import { useState, useCallback } from "react";
import ContactDetailsForm from "../../Components/ContactDetailsForm.js";
import BankDetailsForm from "../../Components/BankDetailsForm.js";
import WorkExperienceForm from "../../Components/WorkExperienceForm.js";
import EducationForm from "../../Components/EducationForm.js";
import PersonalInformationForm from "../../Components/PersonalInformationForm.js";

const EmployeeProfile = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "personal-information-1",
      content: "Personal Information",
      accessibilityLabel: "Personal Information",
      panelID: "personal-information-content-1",
      formComponent: <PersonalInformationForm />,
    },
    {
      id: "contact-details-1",
      content: "Contact Details",
      panelID: "contact-details-content-1",
      formComponent: <ContactDetailsForm />,
    },
    {
      id: "bank-details-1",
      content: "Bank Details",
      panelID: "bank-details-content-1",
      formComponent: <BankDetailsForm />,
    },
    {
      id: "work-experience-1",
      content: "Work Experience",
      panelID: "work-experience-1",
      formComponent: <WorkExperienceForm />,
    },
    {
      id: "education-1",
      content: "Education",
      panelID: "education-content-1",
      formComponent: <EducationForm />,
    },
  ];

  return (
    <Page
      title="Employee Profile"
      // primaryAction={{
      //   content: "Save",
      //   onAction: () => {
      //     // Handle save action logic here
      //   },
      // }}
    >
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card title={tabs[selected].content}>
            {tabs[selected].formComponent}
          </Card>
        </Tabs>
      </Card>
    </Page>
  );
};

export default EmployeeProfile;
