import {
  FormLayout,
  Text,
  TextField,
  Checkbox,
  RadioButton,
  PageActions,
  InlineError,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import SelectSearchable from "react-select";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

const InternshipProgramDetailsForm = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    speciality: "",
    specify: "",
    startDate: "",
    endDate: "",
    internshipStatus: "",
    mentor: "",
    mentorPosition: "",
    assistantMentor: "",
    assistantMentorPosition: "",
    schedule: "",
  });
  const [optionsJobTitle, setOptionsJobTitle] = useState([]);
  const [optionsSpeciality, setOptionsSpeciality] = useState([]);

  const [optionsActiveEmployee, setOptionsActiveEmployee] = useState([]);

  const handleSelectChangeSpeciality = (newValue) => {
    setItem({ ...item, speciality: newValue });
  };
  const handleChangeSpecify = (newValue) => {
    setItem({ ...item, specify: newValue });
  };
  const handleChangeStartDate = (newValue) => {
    setItem({ ...item, startDate: newValue });
    setStartDateError("");
  };
  const [startDateError, setStartDateError] = useState("");

  const handleChangeEndDate = (newValue) => {
    setItem({ ...item, endDate: newValue });
  };
  const handleChangeInternshipStatus = (newValue) => {
    setItem({ ...item, internshipStatus: newValue });
  };
  const handleChangeMentor = (newValue) => {
    setItem({ ...item, mentor: newValue });
    setMentorError("");
  };
  const [mentorError, setMentorError] = useState("");

  const handleChangeMentorPosition = (newValue) => {
    setItem({ ...item, mentorPosition: newValue });
  };
  const handleChangeAssistantMentor = (newValue) => {
    setItem({ ...item, assistantMentor: newValue });
  };
  const handleChangeAssistantMentorPosition = (newValue) => {
    setItem({ ...item, assistantMentorPosition: newValue });
  };
  const handleChangeSchedule = (newValue) => {
    setItem({ ...item, schedule: newValue ? "standard" : "custom" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseSpecialities = "";
    let responseJobTitles = "";
    let responseActiveEmployees = "";
    let responseItem = "";

    try {
      responseItem = await axios.get(`/internship-program-details/${id}`);
      console.log(responseItem.data.data);
      setItem({
        speciality: responseItem?.data?.data?.speciality_id
          ? responseItem?.data?.data?.speciality_id
          : "",
        speciality_other: responseItem?.data?.data?.speciality_other
          ? responseItem?.data?.data?.speciality_other
          : "",
        internshipStatus: responseItem?.data?.data?.internship_status
          ? responseItem?.data?.data?.internship_status
          : "",
        startDate: responseItem?.data?.data?.start_date
          ? responseItem?.data?.data?.start_date
          : "",
        endDate: responseItem?.data?.data?.end_date
          ? responseItem?.data?.data?.end_date
          : "",
        mentor: responseItem?.data?.data?.mentor_id
          ? responseItem?.data?.data?.mentor_id
          : "",
        mentorPosition: responseItem?.data?.data?.mentor_position_id
          ? responseItem?.data?.data?.mentor_position_id
          : "",
        assistantMentor: responseItem?.data?.data?.assistant_mentor_id
          ? responseItem?.data?.data?.assistant_mentor_id
          : "",
        assistantMentorPosition: responseItem?.data?.data
          ?.assistant_mentor_position_id
          ? responseItem?.data?.data?.assistant_mentor_position_id
          : "",

        isActive: responseItem?.data?.data?.is_active ? true : false,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      responseSpecialities = await axios.get(`/specialities`);
      setOptionsSpeciality(
        responseSpecialities.data.data.data.map((item, index) => {
          return {
            label: item.speciality,
            value: String(item.id),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }

    try {
      responseJobTitles = await axios.get(`/job-titles`);
      setOptionsJobTitle(
        responseJobTitles.data.data.data.map((item, index) => {
          return {
            label: item.name,
            value: String(item.id),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
    try {
      responseActiveEmployees = await axios.get(`/employees`);
      setOptionsActiveEmployee(
        responseActiveEmployees.data.data.data.map((item, index) => {
          return {
            label: item.first_name + " " + item.last_name,
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
        Internship Program Details
      </Text>
      <FormLayout.Group>
        <FormLayout>
          <Text>Speciality</Text>
          <SelectSearchable
            options={optionsSpeciality}
            onChange={handleSelectChangeSpeciality}
            value={item.speciality}
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
          value={item.specify}
          onChange={handleChangeSpecify}
          label="Specify (if other selected)"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Joining/Starting Date"
          value={item.startDate}
          type="date"
          error={startDateError}
          requiredIndicator
          onChange={handleChangeStartDate}
          placeholder="MM/DD/YYYY"
        />

        <TextField
          label="End Date"
          type="date"
          value={item.endDate}
          onChange={handleChangeEndDate}
          placeholder="MM/DD/YYYY"
        />
      </FormLayout.Group>
      <text>Schedule</text>
      <Card>
        <FormLayout.Group>
          <RadioButton
            label="Standard working time ( T, W,TH, F) 10:00 to 15:00"
            // checked={item.schedule === "standard"}
            id="standard"
            name="schedule"
            value={item.schedule === "standard"}
            onChange={handleChangeSchedule}
          />
          <RadioButton
            label="Custom Working Time"
            id="custom"
            name="schedule"
            // checked={item.schedule === "custom"}
            value={item.schedule === "custom"}
            onChange={handleChangeSchedule}
          />
        </FormLayout.Group>
      </Card>
      <text>Internship Status</text>
      <Card>
        <FormLayout.Group>
          <Checkbox
            label="Is Active"
            checked={item.internshipStatus}
            onChange={handleChangeInternshipStatus}
          />
        </FormLayout.Group>
      </Card>
      <FormLayout.Group>
        <FormLayout>
          <Text>
            Mentor <span style={{ color: "darkred" }}>*</span>
          </Text>

          <SelectSearchable
            options={optionsActiveEmployee}
            onChange={handleChangeMentor}
            value={item.mentor}
            error={mentorError}
            requiredIndicator
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
          <InlineError message={mentorError} fieldID="MentorFieldID" />
        </FormLayout>
      </FormLayout.Group>
      <FormLayout.Group>
        <FormLayout>
          <Text>Mentor's Position</Text>
          <SelectSearchable
            options={optionsJobTitle}
            onChange={handleChangeMentorPosition}
            value={item.mentorPosition}
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </FormLayout>
      </FormLayout.Group>
      <FormLayout.Group>
        <FormLayout>
          <Text>Assistant Mentor</Text>
          <SelectSearchable
            options={optionsActiveEmployee}
            onChange={handleChangeAssistantMentor}
            value={item.assistantMentor}
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </FormLayout>
      </FormLayout.Group>
      <FormLayout.Group>
        <FormLayout>
          <Text>Assistant Mentor's Position</Text>
          <SelectSearchable
            options={optionsJobTitle}
            onChange={handleChangeAssistantMentorPosition}
            value={item.assistantMentorPosition}
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </FormLayout>
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
    if (!item.startDate || !item.mentor) {
      !item.startDate && setStartDateError("This field is required");
      !item.mentor && setMentorError("This field is required");
    } else {
      const bodyObj = {
        speciality_id: item.speciality.value,
        speciality_other: item.specify,
        internship_status: item.internshipStatus,
        start_date: item.startDate,
        end_date: item.endDate,
        schedule: item.schedule,
        mentor_id: item.mentor.value,
        mentor_position_id: item.mentorPosition.value,
        assistant_mentor_id: item.assistantMentor.value,
        assistant_mentor_position_id: item.assistantMentorPosition.value,
        intern_id: id,
      };

      axios
        .patch(`/internship-program-details/${id}`, bodyObj)
        .then((result) => {
          console.log(result);
          console.log("internship program details updated");
        })
        .catch((err) => console.log(err));
    }
  }
};

export default InternshipProgramDetailsForm;
