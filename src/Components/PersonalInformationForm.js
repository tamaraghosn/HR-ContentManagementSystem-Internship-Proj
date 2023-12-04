
import {Card, Form, FormLayout, Text,TextField, Select, DropZone } from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";



const PersonalInformationForm = () => {
    const [item, setItem] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        displayName: "",
        fatherName:"",
        motherName:"",
        dateOfBirth: null,
        bloodType:"",
        gender: "",
        nationality:"",
        otherNationality:"",
        maritalStatus:"",
        profilePicture:"",
        linkedInLink:"",
        bio:"",






    })

    const handleChangeFirstName = (newValue) => {
        setItem({ ...item, firstName: newValue });
        setFirstNameError("");
      };
      const [firstNameError, setFirstNameError] = useState("");

    const handleChangeMiddleName = (newValue) => {
        setItem({ ...item, middleName: newValue });
      };

    const handleChangeLastName = (newValue) => {
        setItem({ ...item, lastName: newValue });
        setLastNameError("");
      };
      const [lastNameError, setLastNameError] = useState("");

     const handleChangeDisplayName = (newValue) => {
        setItem({ ...item, displayName: newValue });
     };

    const handleChangeFatherName = (newValue) => {
        setItem({ ...item, fatherName: newValue });
      };

    const handleChangeMotherName = (newValue) => {
        setItem({ ...item, motherName: newValue });
      };

    const handleChangeDateOfBirth = (date) => {
        setItem({ ...item, dateOfBirth: date });
    };

    const handleSelectChangeBloodType = (newValue) => {
        setItem({ ...item, bloodType: newValue });
      };
    const optionsBloodType = [
    { label: "A+", value: "a+" },
    { label: "A-", value: "a-" },
    { label: "B+", value: "b+" },
    { label: "B-", value: "b-" },
    { label: "O+", value: "o+" },
    { label: "O-", value: "o-" },
    { label: "AB+", value: "ab+" },
    { label: "AB-", value: "ab-" },

    ];

    const handleSelectChangeGender = (newValue) => {
        setItem({ ...item, gender: newValue });
      };
    
      const optionsGender = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ];

    const handleSelectChangeNationality = (newValue) => {
        setItem({ ...item, nationality: newValue });
    };
    const handleSelectChangeOtherNationality = (newValue) => {
        setItem({ ...item, otherNationality: newValue });
    };
    const handleSelectChangeMaritalStatus = (newValue) => {
        setItem({ ...item, maritalStatus: newValue });
    };

    // const handleChangeProfilePicture = (file) => {
    //     setItem({ ...item, profilePicture: file });
    //     // Handle file upload logic, validate size and type
    // //     const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    // //     const allowedFileTypes = ['image/jpeg', 'image/png'];
    
    // //     if (file && file.size <= maxSizeInBytes && allowedFileTypes.includes(file.type)) {
    // //       setItem({ ...item, profilePicture: file });
   
    // //   };
    // };
    const handleChangeLinkedInLink = (newValue) => {
        setItem({ ...item, linkedInLink: newValue });
    };
    const handleChangeBio = (newValue) => {
        setItem({ ...item, bio: newValue });
    };
    const handleDropProfilePicture = (file) => {
        setItem({ ...item, profilePicture: file });
    };

   




    return ( 
        <FormLayout>
          <Text variant="headingSm" as="h6">
            PERSONAL INFORMATION
          </Text>
          <FormLayout.Group>
            <TextField
              value={item.firstName}
              onChange={handleChangeFirstName}
              error={firstNameError}
              label="First Name"
              requiredIndicator
            />
            <TextField
              value={item.middleName}
              onChange={handleChangeMiddleName}
              label="Middle Name"
            />
        </FormLayout.Group>
        <FormLayout.Group>
            <TextField
              value={item.lastName}
              onChange={handleChangeLastName}
              error={lastNameError}
              label="Last Name"
              requiredIndicator
            />
            <TextField
              value={item.displayName}
              onChange={handleChangeDisplayName}
              label="Display Name"
            />
        </FormLayout.Group>
        <FormLayout.Group>
            <TextField
              value={item.fatherName}
              onChange={handleChangeFatherName}
              label="Father Name"
            />
            <TextField
              value={item.motherName}
              onChange={handleChangeMotherName}
              label="Mother Name"
            />
        </FormLayout.Group>
         <FormLayout.Group>
            <TextField
              label="Date Of Birth"
              value={item.dateOfBirth}
              type="date"
              onChange={handleChangeDateOfBirth}
              placeholder="MM/DD/YYYY"
            />
            <Select
              label="Blood Type"
              options={optionsBloodType.map((item, index) => {
                return { label: item.label, value: item.value };
              })}
              onChange={handleSelectChangeBloodType}
              value={item.bloodType}
              placeholder="Please choose an option"
            />
            </FormLayout.Group>
            <FormLayout.Group>
            <Select
              label="Gender"
              options={optionsGender.map((item, index) => {
                return { label: item.label, value: item.value };
              })}
              onChange={handleSelectChangeGender}
              value={item.gender}
              placeholder="Please choose an option"
            />
            <Select
              label="Nationality"
            //   options={optionsNationality.map((item, index) => {
            //     return { label: item.label, value: item.value };
            //   })}
              onChange={handleSelectChangeNationality}
              value={item.nationality}
              placeholder="Please choose an option"
            />
            </FormLayout.Group>
            <FormLayout.Group>
            <Select
              label="Other Nationality"
            //   options={optionsOtherNationality.map((item, index) => {
            //     return { label: item.label, value: item.value };
            //   })}
              onChange={handleSelectChangeOtherNationality}
              value={item.otherNationality}
              placeholder="Please choose an option"
            />
            <Select
              label="Marital Status"
            //   options={optionsMaritalStatus.map((item, index) => {
            //     return { label: item.label, value: item.value };
            //   })}
              onChange={handleSelectChangeMaritalStatus}
              value={item.maritalStatus}
              placeholder="Please choose an option"
            />
         </FormLayout.Group>

         <FormLayout.Group>
            <TextField
              label="Bio"
              value={item.bio}
              onChange={handleChangeBio}
              placeholder="Write a short bio"
              showCharacterCount
            />
            <TextField
              label="LinkedIn Profile Link"
              value={item.linkedInLink}
              onChange={handleChangeLinkedInLink}
            />
        </FormLayout.Group>
            <DropZone
             accept="image/*"
             label="Profile Picture"
             type="image"  
             onDrop={handleDropProfilePicture} 
             value={item.profilePicture}>
           </DropZone>
         
    </FormLayout>
    
  
    
    
    );
}
 
export default PersonalInformationForm;