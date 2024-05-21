import React from "react";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { formDataAtom, formErrorAtom } from "../../jotai/atoms";
import { ErrorMessage } from "../atoms/ErrorMessage ";

export const PasswordInput = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [formError, setFormError] = useAtom(formErrorAtom);

  const handleChange =
    (field: "password" | "checkPassword") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setFormData((prevData) => ({ ...prevData, [field]: newValue }));

      if (newValue.trim().length === 0) {
        setFormError((prevError) => ({
          ...prevError,
          [field]: "入力してください",
        }));
      } else if (field === "password" && newValue.trim().length < 4) {
        setFormError((prevError) => ({
          ...prevError,
          [field]: "パスワードは4文字以上でなければなりません",
        }));
      } else if (field === "checkPassword" && newValue !== formData.password) {
        setFormError((prevError) => ({
          ...prevError,
          [field]: "パスワードが一致していません",
        }));
      } else {
        setFormError((prevError) => ({ ...prevError, [field]: "" }));
      }
    };
  return (
    <>
      <TextField
        label="パスワード"
        variant="outlined"
        name="password"
        value={formData.password}
        onChange={handleChange("password")}
        fullWidth
        placeholder="パスワード"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <ErrorMessage>{formError.password}</ErrorMessage>
      <TextField
        label="パスワード確認"
        variant="outlined"
        name="checkPassword"
        value={formData.checkPassword}
        onChange={handleChange("checkPassword")}
        fullWidth
        placeholder="パスワード確認"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <ErrorMessage>{formError.checkPassword}</ErrorMessage>
    </>
  );
};
