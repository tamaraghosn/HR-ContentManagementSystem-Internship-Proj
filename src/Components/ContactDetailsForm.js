import {Card, Form, FormLayout, Text,TextField, Select, DropZone } from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";






const ContactDetailsForm = () => {
    const [item, setItem] = useState({
        phoneNumber: "",
        email:"",
        residenceAddress:"",
        residencePhone:"",
        country:"",
        firstName:"",
        lastName:"",
        relationship:"",
        emergencyPhoneContact:"",
        identificationCountry:"",
        idDocumentsPassport:"",






    })
    const handleChangePhoneNumber = (newValue) => {
        setItem({ ...item, phoneNumber: newValue });
    };
    const handleChangeEmail = (newValue) => {
        setItem({ ...item, email: newValue });
    };
    
    const handleChangeResidenceAddress = (newValue) => {
        setItem({ ...item, residenceAddress: newValue });
    };
    const handleChangeResidencePhone = (newValue) => {
        setItem({ ...item, residencePhone: newValue });
    };
    const handleChangeCountry = (newValue) => {
        setItem({ ...item, country: newValue });
    };
    const handleChangeFirstName = (newValue) => {
        setItem({ ...item, firstName: newValue });
    };
    const handleChangeLastName = (newValue) => {
        setItem({ ...item, lastName: newValue });
    };
    const handleChangeRelationship= (newValue) => {
        setItem({ ...item, relationship: newValue });
    };
    const handleChangeEmergencyPhoneContact = (newValue) => {
        setItem({ ...item, emergencyPhoneContact: newValue });
    };
    const handleSelectChangeIdentificationCountry= (newValue) => {
        setItem({ ...item, identificationCountry: newValue });

    };
    const handleDropDocs = (file) => {
        setItem({ ...item, idDocumentsPassport: file });
    };

    



    return (
        <FormLayout>
           <Text variant="headingSm" as="h6">
           CONTACT DETAILS
          </Text>
          <FormLayout.Group>
            <TextField
            label="Phone Number"
            value={item.phoneNumber}
            onChange={handleChangePhoneNumber}
            />
            <TextField
            label="Email"
            value={item.email}
            type="email"
            onChange={handleChangeEmail}
            />

          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
            label="Residential Address"
            value={item.residenceAddress}
            onChange={handleChangeResidenceAddress}
            />
            <TextField
            label="Residence Phone"
            value={item.residencePhone}
            onChange={handleChangeResidencePhone}
            />

          </FormLayout.Group>
          <Text variant="headingSm" as="h6">
           EMERGENCY CONTACT
          </Text>
          <FormLayout.Group>
            <TextField
            label="First Name"
            value={item.firstName}
            onChange={handleChangeFirstName}
            />
            <TextField
            label="Last Name"
            value={item.lastName}
            onChange={handleChangeLastName}
            />

          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
                label="Country"
                value={item.country}
                onChange={handleChangeCountry}
            />
            <TextField
            label="Relationship"
            value={item.relationship}
            onChange={handleChangeRelationship}
            />

          </FormLayout.Group>
           <TextField
            label="Contact Details - Phone Number"
            value={item.emergencyPhoneContact}
            onChange={handleChangeEmergencyPhoneContact}
            />
            <Text variant="headingSm" as="h6">
           IDENTIFICATION DOCUMENTS
          </Text>
          <Select
              label="Country"
            //   options={optionsCountry.map((item, index) => {
            //     return { label: item.label, value: item.value };
            //   })}
              onChange={handleSelectChangeIdentificationCountry}
              value={item.identificationCountry}
              placeholder="Please choose an option"
            />
          <DropZone
             label="ID Document/ Passport"  
             onDrop={handleDropDocs} 
             value={item.idDocumentsPassport}>
           </DropZone>


          
        </FormLayout>

    
    
    
    
    
    
    
    
    
    
    
    
        );
}
 
export default ContactDetailsForm;