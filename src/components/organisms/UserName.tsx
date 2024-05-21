import React from "react";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { formDataAtom } from "../../jotai/atoms";

export const UserNameInput = () => {
  const [formData, setFormData] = useAtom(formDataAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, userName: newValue }));
  };

  return (
    <TextField
      label="ユーザーネーム"
      variant="outlined"
      name="username"
      value={formData.userName}
      onChange={handleChange}
      fullWidth
      placeholder="ユーザーネーム（任意）"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
