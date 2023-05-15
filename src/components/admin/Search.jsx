import React, { useState } from "react";
import axios from '../../api/Axios.js';
import Autosuggest from "react-autosuggest";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const onSearchTermChange = (event, { newValue }) => {
    setSearchTerm(newValue);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await axios.post("/admin/suggestions", { searchTerm: value });
      setSuggestions(response.data);
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching suggestions.");
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = async (event, { suggestionValue }) => {
    setSearchTerm(suggestionValue);
    try {
      const response = await axios.post("/search", { searchTerm: suggestionValue });
      setSearchResults(response?.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("An error occurred while searching.");
    }
  };

  const onSearchClick = async () => {
    try {
      const response = await axios.post("/search", { searchTerm });
      console.log(response?.data)
      setSearchResults(response.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("An error occurred while searching.");
    }
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };

  const renderDetail = (detail) => {
    return <div key={detail.id}>{detail.name}</div>;
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion;
  };

  const inputProps = {
    placeholder: "Search...",
    value: searchTerm,
    onChange: onSearchTermChange,
  };

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <button onClick={onSearchClick}>Search</button>
      {error && <div>{error}</div>}
      {searchResults.length === 0 && !error && <div>No results found.</div>}
      {searchResults.length > 0 &&
        searchResults?.map((detail) => renderDetail(detail))}
    </div>
  );
};

export default SearchBox;