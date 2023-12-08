import { FormLayout, Text, TextField, Select } from "@shopify/polaris";
import React, { useState } from "react";

const EducationForm = () => {
  const [item, setItem] = useState({
    language: "",
    speakingLevel: "",
    readingLevel: "",
    writingLevel: "",
    country: "",
    institution: "",
    degree: "",
    major: "",
    startDate: null,
    endDate: null,
  });
  const optionsLanguageLevels = [
    { label: "Beginner", value: "beginner" },
    { label: "Conversational", value: "conversational" },
    { label: "Business", value: "business" },
    { label: "Fluent", value: "fluent" },
    { label: "Native", value: "native" },
  ];

  const optionsDegree = [
    { label: "Bachelor", value: "bachelor" },
    { label: "Master", value: "master" },
    { label: "PHD", value: "phd" },
    { label: "High School", value: "highschool" },
    { label: "Diploma", value: "diploma" },
    { label: "Certificate", value: "certificate" },
    { label: "Other", value: "other" },
  ];

  const handleSelectChangeLanguage = (newValue) => {
    setItem({ ...item, language: newValue });
  };
  const handleSelectChangeSpeakingLevel = (newValue) => {
    setItem({ ...item, speakingLevel: newValue });
  };
  const handleSelectChangeReadingLevel = (newValue) => {
    setItem({ ...item, readingLevel: newValue });
  };
  const handleSelectChangeWritingLevel = (newValue) => {
    setItem({ ...item, writingLevel: newValue });
  };
  const handleSelectChangeCountry = (newValue) => {
    setItem({ ...item, country: newValue });
  };
  const handleChangeInstitution = (newValue) => {
    setItem({ ...item, institution: newValue });
  };
  const handleSelectChangeDegree = (newValue) => {
    setItem({ ...item, degree: newValue });
  };
  const handleChangeMajor = (newValue) => {
    setItem({ ...item, major: newValue });
  };
  const handleChangeStartDate = (date) => {
    setItem({ ...item, startDate: date });
  };
  const handleChangeEndDate = (date) => {
    setItem({ ...item, endDate: date });
  };

  return (
    <FormLayout>
      <Text variant="headingSm" as="h6">
        EDUCATION
      </Text>

      <FormLayout.Group>
        <Select
          label="Language"
          // options={optionsLanguage.map((item, index) => {
          //     return { label: item.label, value: item.value };
          // })}
          onChange={handleSelectChangeLanguage}
          value={item.language}
          placeholder="Choose an option"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <Select
          label="Speaking Level"
          options={optionsLanguageLevels.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeSpeakingLevel}
          value={item.speakingLevel}
          placeholder="Choose an option"
        />
        <Select
          label="Reading Level"
          options={optionsLanguageLevels.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeReadingLevel}
          value={item.readingLevel}
          placeholder="Choose an option"
        />
        <Select
          label="Writing Level"
          options={optionsLanguageLevels.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeWritingLevel}
          value={item.writingLevel}
          placeholder="Choose an option"
        />
      </FormLayout.Group>
      <Text variant="headingSm" as="h6">
        DEGREES & CERTIFICATIONS
      </Text>
      <FormLayout.Group>
        <Select
          label="Country"
          // options={optionsCountry.map((item, index) => {
          //     return { label: item.label, value: item.value };
          // })}
          onChange={handleSelectChangeCountry}
          value={item.country}
          placeholder="Choose an option"
        />
        <TextField
          label="Institution"
          value={item.institution}
          onChange={handleChangeInstitution}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <Select
          label="Degree"
          options={optionsDegree.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeDegree}
          value={item.degree}
          placeholder="Choose an option"
        />
        <TextField
          label="Subject/Major"
          value={item.major}
          onChange={handleChangeMajor}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Start Date"
          value={item.startDate}
          type="date"
          onChange={handleChangeStartDate}
        />
        <TextField
          label="End Date"
          type="date"
          value={item.endDate}
          onChange={handleChangeEndDate}
        />
      </FormLayout.Group>
    </FormLayout>
  );
};

export default EducationForm;
