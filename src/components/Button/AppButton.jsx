import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
const AppButton = ({ text, link }) => {
  const navigate = useNavigate();
  navigate(link);

  return <Button variant="outline">{text}</Button>;
};
export default AppButton;
