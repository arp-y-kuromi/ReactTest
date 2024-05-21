import React from "react";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { formDataAtom, formErrorAtom } from "../../jotai/atoms";
import { ErrorMessage } from "../atoms/ErrorMessage ";

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const EmailInput = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [formError, setFormError] = useAtom(formErrorAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, mail: newValue }));

    if (newValue.trim().length === 0) {
      setFormError((prevError) => ({
        ...prevError,
        mail: "入力してください",
      }));
    } else if (!emailPattern.test(newValue)) {
      setFormError((prevError) => ({
        ...prevError,
        mail: "有効なメールアドレスを入力してください",
      }));
    } else {
      setFormError((prevError) => ({ ...prevError, mail: "" }));
    }
  };

  return (
    <>
      <TextField
        label="メール"
        variant="outlined"
        name="mail"
        value={formData.mail}
        onChange={handleChange}
        fullWidth
        placeholder="sample@example.com"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {formError.mail && <ErrorMessage>{formError.mail}</ErrorMessage>}
    </>
  );
};
