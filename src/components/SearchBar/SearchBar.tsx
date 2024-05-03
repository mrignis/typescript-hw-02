import React, { useState } from "react";
import { toast } from "react-hot-toast";
import isEnglish from "is-english";

type SearchBarProps = {
  onSubmit: (searchTerm: string) => void;
  onCloseModal?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, onCloseModal }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      toast.error("Please enter a search term.");
      return;
    }

    if (!isEnglish(searchTerm.trim())) {
      toast.error("Please enter an English word.");
      if (onCloseModal) {
        onCloseModal();
      }
      return;
    }

    onSubmit(searchTerm.trim());
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
