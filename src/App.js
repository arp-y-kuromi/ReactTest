import "./App.css";
import BackHandRoundedIcon from "@mui/icons-material/BackHandRounded";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  text-align: center;
`;

const SliderContainer = styled.div`
  margin: 40px;
  text-align: center;
`;

function App() {
  return (
    <>
      <AppContainer>
        <BackHandRoundedIcon />
        <SliderContainer>
          <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
            valueLabelDisplay="auto"
            sx={{ width: 1200 }}
          />
        </SliderContainer>
        <SliderContainer>
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            sx={{ width: 1200 }}
          />
        </SliderContainer>
        <p>MUIテスト</p>
      </AppContainer>
    </>
  );
}

export default App;
