import React, { useState } from 'react';
import '../styles/SearchComponent.css'; // Import CSS for styling

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
        placeholder="Tìm sản phẩm..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Tìm
      </button>
    </div>
  );
};

export default SearchComponent;