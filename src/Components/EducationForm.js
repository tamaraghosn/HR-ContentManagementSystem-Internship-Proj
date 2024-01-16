import {
  FormLayout,
  Text,
  TextField,
  Select,
  Button,
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
    { label: "Beginner", value: "Beginner" },
    { label: "Conversational", value: "Conversational" },
    { label: "Business", value: "Business" },
    { label: "Fluent", value: "luent" },
    { label: "Native", value: "Native" },
  ];

  const optionsDegree = [
    { label: "Pursuing Undergraduate Degree", value: "1" },
    { label: "Holding Undergraduate Degree", value: "2" },
    { label: "Pursuing Graduate Degree", value: "3" },
    { label: "Holding Graduate Degree", value: "4" },
    { label: "Self Educated Enthusiast", value: "5" },
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
  const [optionsLanguage, setOptionsLanguage] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseLanguages = "";
    let responseItem1 = "";
    let responseItem2 = "";

    try {
      responseItem1 = await axios.get(`/language-skills/${id}`);
      console.log(responseItem1.data.data);
      setItem({
        language: responseItem1?.data?.data?.language_id
          ? responseItem1?.data?.data?.language_id
          : "",
        speakingLevel: responseItem1?.data?.data?.speaking_level
          ? responseItem1?.data?.data?.speaking_level
          : "",
        readingLevel: responseItem1?.data?.data?.reading_level
          ? String(responseItem1?.data?.data?.reading_level)
          : "",
        writingLevel: responseItem1?.data?.data?.writing_level
          ? String(responseItem1?.data?.data?.writing_level)
          : "",

        isActive: responseItem1?.data?.data?.is_active ? true : false,
      });
    } catch (error) {
      console.log(error);
    }
    try {
      responseItem2 = await axios.get(`/degrees-certifications/${id}`);
      console.log(responseItem2.data.data);
      setItem({
        country: responseItem2?.data?.data?.country
          ? responseItem2?.data?.data?.country
          : "",
        institution: responseItem2?.data?.data?.institution
          ? responseItem2?.data?.data?.institution
          : "",
        major: responseItem2?.data?.data?.major
          ? responseItem2?.data?.data?.major
          : "",
        degree: responseItem2?.data?.data?.degree
          ? responseItem2?.data?.data?.degree
          : "",
        startDate: responseItem2?.data?.data?.start_date
          ? responseItem2?.data?.data?.end_date
          : "",

        isActive: responseItem1?.data?.data?.is_active ? true : false,
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
      <Text variant="headingSm" as="h6">
        DEGREES & CERTIFICATIONS
      </Text>
      <FormLayout.Group>
        <FormLayout>
          <Text>Country</Text>
          <SelectSearchable
            options={countryList.map((item, index) => {
              return { label: item.name, value: item.name };
            })}
            onChange={handleSelectChangeCountry}
            value={item.country}
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </FormLayout>
      </FormLayout.Group>
      <FormLayout.Group>
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
          placeholder="Please select"
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
      // language_id: item.language.value,
      language_id: "1",
      employee_id: id,
      speaking_level: item.speakingLevel,
      reading_level: item.readingLevel,
      writing_level: item.writingLevel,
    };
    const bodyObj2 = {
      country: item.country.value,
      institution: item.institution,
      degree: item.degree,
      major: item.major,
      start_date: item.startDate,
      end_date: item.endDate,
      employee_id: id,
    };

    axios
      .patch(`/language-skills/${id}`, bodyObj1)
      .then((result) => {
        console.log(result);
        console.log("language skills updated");
      })
      .catch((err) => console.log(err));

    axios
      .patch(`/degrees-certifications/${id}`, bodyObj2)
      .then((result) => {
        console.log(result);
        console.log("degrees and certifications updated");
      })
      .catch((err) => console.log(err));
  }
};

export default EducationForm;
