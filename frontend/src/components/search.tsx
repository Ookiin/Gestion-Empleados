import { useNavigate } from "react-router-dom";
import { searchEmployees } from "../services/authService";
import { useState } from "react";
import {
  SearchContainerInput,
  SearchInput,
  SearchButtonInput,
} from "../../styles";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token || searchTerm.trim() === "") return;

    try {
      const results = await searchEmployees(searchTerm);
      navigate("/searchResults", { state: { results } });
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  return (
    <SearchContainerInput>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar empleado"
      />
      <SearchButtonInput onClick={handleSearch}>Buscar</SearchButtonInput>
    </SearchContainerInput>
  );
}
