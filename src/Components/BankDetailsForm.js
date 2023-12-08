import { FormLayout, Text, TextField, Select } from "@shopify/polaris";
import React, { useState } from "react";

const BankDetailsForm = () => {
  const [item, setItem] = useState({
    country: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    iban: "",
    swiftCode: "",
  });

  const handleSelectChangeCountry = (newValue) => {
    setItem({ ...item, country: newValue });
  };
  const handleChangeBankName = (newValue) => {
    setItem({ ...item, bankName: newValue });
  };
  const handleChangeAccountName = (newValue) => {
    setItem({ ...item, accountName: newValue });
  };
  const handleChangeAccountNumber = (newValue) => {
    setItem({ ...item, accountNumber: newValue });
  };
  const handleChangeIban = (newValue) => {
    setItem({ ...item, iban: newValue });
  };
  const handleChangeSwiftCode = (newValue) => {
    setItem({ ...item, swiftCode: newValue });
  };

  return (
    <FormLayout>
      <Text variant="headingSm" as="h6">
        BANK DETAILS
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
          label="Bank Name"
          value={item.bankName}
          onChange={handleChangeBankName}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Account Name"
          value={item.accountName}
          onChange={handleChangeAccountName}
        />
        <TextField
          label="Account Number"
          value={item.accountNumber}
          onChange={handleChangeAccountNumber}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField label="IBAN" value={item.iban} onChange={handleChangeIban} />
        <TextField
          label="Swift Code"
          value={item.swiftCode}
          onChange={handleChangeSwiftCode}
        />
      </FormLayout.Group>
    </FormLayout>
  );
};

export default BankDetailsForm;
