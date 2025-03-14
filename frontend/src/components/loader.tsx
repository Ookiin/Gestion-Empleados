import { LoaderContainer } from "../../styles";
import "../../styles/loader.css";
export default function Loader() {
  return (
    <LoaderContainer>
      <div className="spinner"></div>
    </LoaderContainer>
  );
}
