import React from "react";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { formDataAtom, formErrorAtom } from "../../jotai/atoms";
import { ErrorMessage } from "../atoms/ErrorMessage ";

export const NameInput = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [formError, setFormError] = useAtom(formErrorAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, name: newValue }));

    if (newValue.trim().length === 0) {
      setFormError((prevError) => ({
        ...prevError,
        name: "入力してください",
      }));
    } else {
      setFormError((prevError) => ({ ...prevError, name: "" }));
    }
  };

  return (
    <>
      <TextField
        label="名前"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        placeholder="お名前"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {formError.name && <ErrorMessage>{formError.name}</ErrorMessage>}
    </>
  );
};
