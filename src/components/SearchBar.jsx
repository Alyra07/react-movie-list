import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row content-center justify-center mb-6">
      <input
        type="text"
        placeholder="Search title..."
        className="text-blue-950 border bg-rose-200 border-blue-200 rounded-lg p-2 mr-2 ml-2 xs:w-96"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <button className="bg-blue-950 text-white rounded-lg p-2 mt-2 sm:mt-0 ml-0 w-full xs:w-auto">
        Search
      </button>
    </div>
  );
};

export default SearchBar;