import { Card, Tabs, Page } from "@shopify/polaris";
import { useState, useCallback } from "react";
import ContactDetailsForm from "../../InternComponents/ContactDetailsForm.js";
import WorkExperienceForm from "../../InternComponents/InternshipProgramDetailsForm.js";
import EducationForm from "../../InternComponents/EducationForm.js";
import PersonalInformationForm from "../../InternComponents/PersonalInformationForm.js";
import { useNavigate } from "react-router-dom";
import InternshipProgramDetailsForm from "../../InternComponents/InternshipProgramDetailsForm.js";

const InternProfile = () => {
  const navigate = useNavigate();
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
      id: "education-1",
      content: "Education",
      panelID: "education-content-1",
      formComponent: <EducationForm />,
    },
    {
      id: "internship-program-details-1",
      content: "Internship Program Details",
      panelID: "internship-program-details-1",
      formComponent: <InternshipProgramDetailsForm />,
    },
  ];

  return (
    <Page
      title="Intern Profile"
      backAction={{ onAction: () => navigate("/admin/interns") }}
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

export default InternProfile;
