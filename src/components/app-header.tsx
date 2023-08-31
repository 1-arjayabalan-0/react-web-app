import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AppHeader = (props) => {
  const router = useNavigate();
  const { btnTxt } = props;
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => router(`/form/?module=${"Users"}&action=${"Create"}`)}
      >
        {btnTxt}
      </Button>
    </div>
  );
};

export default AppHeader;
