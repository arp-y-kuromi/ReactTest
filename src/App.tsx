import styled from "@emotion/styled";
import BackHandRoundedIcon from "@mui/icons-material/BackHandRounded";
import { useAtom } from "jotai";
import { Btn } from "./components/atoms/ Btn";
import { formDataAtom, formErrorAtom } from "./jotai/atoms";
import { EmailInput } from "./components/organisms/EmailInput";
import { NameInput } from "./components/organisms/NameInput";
import { UserNameInput } from "./components/organisms/UserName";
import { PasswordInput } from "./components/organisms/PasswordInput";
import { PostInput } from "./components/organisms/PostInput";
import { useForm } from "react-hook-form";

// ーーーーーーーーーーーーEmotionーーーーーーーーーーーーーーーー

const AppContainer = styled.div`
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px;
`;

const MarginTop = styled.div`
  margin-top: 1rem;
`;

// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function App() {
  // jotai
  const [formData, setFormData] = useAtom(formDataAtom);
  const [formError, setFormError] = useAtom(formErrorAtom);

  const { formState } = useForm({
    mode: "all",
    defaultValues: formData,
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    Object.keys(formData).forEach((key) => {
      if (
        key !== "userName" &&
        (formData[key as keyof typeof formData] as string).trim().length === 0
      ) {
        setFormError((prevError) => ({
          ...prevError,
          [key]: "入力してください",
        }));
        hasError = true;
      }
    });
    if (!hasError) {
      console.log("登録完了:", formData);
      setFormError({
        name: "",
        userName: "",
        mail: "",
        password: "",
        checkPassword: "",
      });
    }
  };

  const isValid = formState.isValid;

  return (
    <>
      <AppContainer>
        <BackHandRoundedIcon />
        <h2>Reactフォーム課題　テスト</h2>
        <FormContainer>
          <form onSubmit={submit} style={{ width: "70%" }}>
            <NameInput />
            <MarginTop />
            <UserNameInput />
            <MarginTop />
            <EmailInput />
            <MarginTop />
            <PasswordInput />
            <MarginTop />
            <PostInput />
            <Btn type="submit" disabled={!isValid}>
              登録
            </Btn>
          </form>
        </FormContainer>
      </AppContainer>
    </>
  );
}

export default App;
