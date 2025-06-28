import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const controls = useAnimation();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleKeyPress = () => {
    // Trigger flair animation on every key press
    controls.start({
      scale: [1, 1.03, 1],
      boxShadow: [
        '0 0 0px rgba(0, 123, 255, 0)',
        '0 0 8px rgba(0, 123, 255, 0.5)',
        '0 0 0px rgba(0, 123, 255, 0)'
      ],
      transition: { duration: 0.3, ease: 'easeOut' }
    });
  };

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Form.Group controlId="searchInput">
        <motion.input
          type="text"
          placeholder="🔍 Search notes by tag (e.g., #react)"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          animate={controls}
          className="form-control search-input"
        />
      </Form.Group>
    </motion.div>
  );
};

export default SearchBar;
