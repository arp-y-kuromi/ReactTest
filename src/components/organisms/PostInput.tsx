import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { Btn } from "../atoms/ Btn";
import { useAtom } from "jotai";
import { frg } from "../../jotai/atoms";

type FormValues = {
  zipcode: string;
  prefecture: string;
  municipality: string;
  address: string;
};

const MarginTop = styled.div`
  margin-top: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ZipcodeField = styled(TextField)`
  max-width: 200px;
`;

export const PostInput: React.FC = () => {
  const {
    register,
    clearErrors,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      zipcode: "",
      prefecture: "",
      municipality: "",
      address: "",
    },
  });

  const prefectureValue = watch("prefecture");
  const municipalityValue = watch("municipality");
  const addressValue = watch("address");

  const [isFormValid, setIsFormValid] = useAtom(frg);

  const validateForm = () => {
    const zipcodeValid = /^[0-9]{7}$/.test(watch("zipcode"));
    const prefectureValid = watch("prefecture").trim().length > 0;
    const municipalityValid = watch("municipality").trim().length > 0;
    const addressValid = watch("address").trim().length > 0;

    setIsFormValid(
      zipcodeValid && prefectureValid && municipalityValid && addressValid
    );
  };

  useEffect(() => {
    validateForm();
  }, [prefectureValue, municipalityValue, addressValue, watch("zipcode")]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.get(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${data.zipcode}`
      );
      if (response.data.results) {
        const result = response.data.results[0];
        const prefecture = result.address1;
        const municipality = `${result.address2}${result.address3}`;
        setValue("prefecture", prefecture);
        setValue("municipality", municipality);
        setValue("address", "");
        clearErrors(["prefecture", "municipality"]);
      } else {
        console.log("No results found.");
        setValue("address", "Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleInputChange = async (field: keyof FormValues, value: string) => {
    setValue(field, value);
    await trigger(field);
  };

  return (
    <>
      <Row>
        <ZipcodeField
          label="郵便番号"
          variant="outlined"
          {...register("zipcode", {
            required: "入力してください",
            pattern: {
              value: /^[0-9]{7}$/,
              message: "ハイフンなしの半角数字で入力してください",
            },
          })}
          placeholder="郵便番号を入力してください"
          error={!!errors.zipcode}
          helperText={errors.zipcode?.message}
          onChange={(e) => handleInputChange("zipcode", e.target.value)}
        />
        <Btn
          type="button"
          onClick={() =>
            onSubmit({
              zipcode: watch("zipcode"),
              prefecture: "",
              municipality: "",
              address: "",
            })
          }
        >
          検索
        </Btn>
      </Row>
      <MarginTop />
      <TextField
        label="都道府県"
        variant="outlined"
        {...register("prefecture", { required: "入力してください" })}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="都道府県"
        value={prefectureValue}
        onChange={(e) => handleInputChange("prefecture", e.target.value)}
        error={!!errors.prefecture}
        helperText={errors.prefecture?.message}
      />
      <MarginTop />
      <TextField
        label="市区町村"
        variant="outlined"
        {...register("municipality", { required: "入力してください" })}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="市区町村"
        value={municipalityValue}
        onChange={(e) => handleInputChange("municipality", e.target.value)}
        error={!!errors.municipality}
        helperText={errors.municipality?.message}
      />
      <MarginTop />
      <TextField
        label="番地"
        variant="outlined"
        {...register("address", { required: "入力してください" })}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="番地"
        value={addressValue}
        onChange={(e) => handleInputChange("address", e.target.value)}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
    </>
  );
};
