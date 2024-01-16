import {
  FormLayout,
  Text,
  TextField,
  Select,
  Button,
  Page,
  PageActions,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import SelectSearchable from "react-select";

import { countryList } from "../countries";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";

const EducationForm = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    educationStatus: "",
    major: "",
    university: "",
    educationalYear: null,
    gpa: "",
    completedCredits: "",
    graduationYear: "",
    language: "",
    speakingLevel: "",
    readingLevel: "",
    writingLevel: "",
  });

  const optionsLanguageLevels = [
    { label: "Beginner", value: "Beginner" },
    { label: "Conversational", value: "Conversational" },
    { label: "Business", value: "Business" },
    { label: "Fluent", value: "luent" },
    { label: "Native", value: "Native" },
  ];

  const optionsStatus = [
    { label: "Pursuing Undergraduate Degree", value: "1" },
    { label: "Holding Undergraduate Degree", value: "2" },
    { label: "Pursuing Graduate Degree", value: "3" },
    { label: "Holding Graduate Degree", value: "4" },
    { label: "Self Educated Enthusiast", value: "5" },
  ];

  const optionsCompletedCredits = [
    { label: "0% - 20%", value: "1" },
    { label: "21% - 40%", value: "2" },
    { label: "41% - 60%", value: "3" },
    { label: "61% - 80%", value: "4" },
    { label: "81% - 100%", value: "5" },
  ];
  const optionsEducationalYear = [
    { label: "1st", value: "1" },
    { label: "2nd", value: "2" },
    { label: "3rd", value: "3" },
    { label: "4th", value: "4" },
    { label: "5th", value: "5" },
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

  const handleSelectChangeEducationStatus = (newValue) => {
    setItem({ ...item, educationStatus: newValue });
  };
  const handleChangeMajor = (newValue) => {
    setItem({ ...item, major: newValue });
  };
  const handleChangeUniversity = (newValue) => {
    setItem({ ...item, university: newValue });
  };
  const handleSelectChangeEducationalYear = (newValue) => {
    setItem({ ...item, educationalYear: newValue });
  };
  const handleSelectChangeGPA = (newValue) => {
    setItem({ ...item, gpa: newValue });
  };
  const handleSelectChangeCompletedCredits = (newValue) => {
    setItem({ ...item, completedCredits: newValue });
  };
  const handleSelectChangeGraduationYear = (newValue) => {
    setItem({ ...item, graduationYear: newValue });
  };

  const [optionsLanguage, setOptionsLanguage] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseLanguages = "";
    let responseItem1 = "";
    let responseItem2 = "";

    try {
      responseItem1 = await axios.get(`/intern-education/${id}`);
      console.log(responseItem1.data.data);
      setItem({
        educationStatus: responseItem1?.data?.data?.education_status
          ? String(responseItem1?.data?.data?.education_status)
          : "",
        major: responseItem1?.data?.data?.major
          ? responseItem1?.data?.data?.major
          : "",
        university: responseItem1?.data?.data?.university
          ? responseItem1?.data?.data?.university
          : "",
        educationalYear: responseItem1?.data?.data?.educational_year
          ? String(responseItem1?.data?.data?.educational_year)
          : "",
        gpa: responseItem1?.data?.data?.gpa
          ? responseItem1?.data?.data?.gpa
          : "",
        completedCredits: responseItem1?.data?.data
          ?.completed_credits_percentage
          ? String(responseItem1?.data?.data?.completed_credits_percentage)
          : "",
        graduationYear: responseItem1?.data?.data?.expected_graduation_year
          ? responseItem1?.data?.data?.expected_graduation_year
          : "",

        isActive: responseItem1?.data?.data?.is_active ? true : false,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      responseItem2 = await axios.get(`/language-skills/${id}`);
      console.log(responseItem2.data.data);
      setItem({
        language: responseItem2?.data?.data?.language_id
          ? responseItem2?.data?.data?.language_id
          : "",
        speakingLevel: responseItem2?.data?.data?.speaking_level
          ? responseItem2?.data?.data?.speaking_level
          : "",
        readingLevel: responseItem2?.data?.data?.reading_level
          ? responseItem2?.data?.data?.reading_level
          : "",
        writingLevel: responseItem2?.data?.data?.writing_level
          ? responseItem2?.data?.data?.writing_level
          : "",
      });
    } catch (error) {
      console.log(error);
    }

    try {
      responseLanguages = await axios.get(`/languages`);
      setOptionsLanguage(
        responseLanguages.data.data.data.map((item, index) => {
          return {
            label: item.name,
            value: String(item.id),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormLayout>
      <Text variant="headingSm" as="h6">
        EDUCATION
      </Text>
      <FormLayout.Group>
        <Select
          label="Education Status"
          options={optionsStatus.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeEducationStatus}
          value={item.educationStatus}
          placeholder="Please select"
        />
        <TextField
          label="Major"
          value={item.major}
          onChange={handleChangeMajor}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="University"
          value={item.university}
          onChange={handleChangeUniversity}
        />
        <Select
          label="Educational Year"
          options={optionsEducationalYear.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeEducationalYear}
          value={item.educationalYear}
          placeholder="Please select"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="GPA"
          value={item.gpa}
          onChange={handleSelectChangeGPA}
        />
        <Select
          label="Percentage of completed credits"
          options={optionsCompletedCredits.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeCompletedCredits}
          value={item.completedCredits}
          placeholder="Please select"
        />
      </FormLayout.Group>
      <TextField
        label="Expected Graduation Year/ Graduation Year"
        value={item.graduationYear}
        type="date"
        onChange={handleSelectChangeGraduationYear}
      />

      <FormLayout.Group>
        <FormLayout>
          <Text>Language</Text>
          <SelectSearchable
            options={optionsLanguage}
            onChange={handleSelectChangeLanguage}
            value={item.language}
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </FormLayout>
      </FormLayout.Group>

      <FormLayout.Group>
        <Select
          label="Speaking Level"
          options={optionsLanguageLevels.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeSpeakingLevel}
          value={item.speakingLevel}
          placeholder="Please select"
        />
        <Select
          label="Reading Level"
          options={optionsLanguageLevels.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeReadingLevel}
          value={item.readingLevel}
          placeholder="Please select"
        />
        <Select
          label="Writing Level"
          options={optionsLanguageLevels.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeWritingLevel}
          value={item.writingLevel}
          placeholder="Please select"
        />
      </FormLayout.Group>

      <PageActions
        primaryAction={{
          content: "Save",
          onClick: handleSave,
        }}
      ></PageActions>
    </FormLayout>
  );
  function handleSave() {
    const bodyObj1 = {
      education_status: item.educationStatus,
      major: item.major,
      university: item.university,
      educational_year: item.educationalYear,
      gpa: item.gpa,
      completed_credits_percentage: item.completedCredits,
      intern_id: id,
      expected_graduation_year: item.graduationYear,
    };
    const bodyObj2 = {
      language_id: item.language,
      intern_id: id,
      speaking_level: item.speakingLevel,
      reading_level: item.readingLevel,
      writing_level: item.writingLevel,
    };

    axios
      .patch(`/intern-education/${id}`, bodyObj1)
      .then((result) => {
        console.log(result);
        console.log(" contact details updated");
      })
      .catch((err) => console.log(err));

    axios
      .patch(`/language-skills/${id}`, bodyObj2)
      .then((result) => {
        console.log(result);
        console.log(" language skills updated");
      })
      .catch((err) => console.log(err));
  }
};

export default EducationForm;
