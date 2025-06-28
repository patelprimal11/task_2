import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <Form className="mb-4">
      <Form.Label htmlFor="searchInput" className="fw-semibold text-primary">
        🔍 Search Blogs by Hashtag
      </Form.Label>
      <InputGroup>
        <InputGroup.Text className="bg-white border-primary text-primary">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          id="searchInput"
          type="text"
          placeholder="e.g. #travel, #coding"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="border-primary shadow-sm"
        />
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
