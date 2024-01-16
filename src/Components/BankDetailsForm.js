import {
  FormLayout,
  Text,
  TextField,
  Select,
  Button,
  PageActions,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import { countryList } from "../countries";
import SelectSearchable from "react-select";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";

const BankDetailsForm = () => {
  const { id } = useParams();

  const [isSaving, setIsSaving] = useState(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";

    try {
      responseItem = await axios.get(`/bank-details/${id}`);
      console.log(responseItem.data.data);
      setItem({
        country: responseItem?.data?.data?.country
          ? responseItem?.data?.data?.country
          : "",
        bankName: responseItem?.data?.data?.bank_name
          ? responseItem?.data?.data?.bank_name
          : "",
        accountName: responseItem?.data?.data?.account_name
          ? responseItem?.data?.data?.account_name
          : "",
        accountNumber: responseItem?.data?.data?.account_number
          ? responseItem?.data?.data?.account_number
          : "",
        iban: responseItem?.data?.data?.iban
          ? responseItem?.data?.data?.iban
          : "",
        swiftCode: responseItem?.data?.data?.swift_code
          ? responseItem?.data?.data?.swift_code
          : "",
        isActive: responseItem?.data?.data?.is_active ? true : false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormLayout>
      <Text variant="headingSm" as="h6">
        BANK DETAILS
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
      <PageActions
        primaryAction={{
          content: "Save",
          onClick: handleSave,
        }}
      ></PageActions>
    </FormLayout>
  );
  function handleSave() {
    const bodyObj = {
      country: item.country.value,
      bank_name: item.bankName,
      account_name: item.accountName,
      account_number: item.accountNumber,
      iban: item.iban,
      swift_code: item.swiftCode,
      employee_id: id,
    };

    axios
      .patch(`/bank-details/${id}`, bodyObj)
      .then((result) => {
        console.log(result);
        console.log("bank details updated");
      })
      .catch((err) => console.log(err));
  }
};

export default BankDetailsForm;
