import React, { useState, useEffect } from 'react';
import { Button, Container, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import SearchBar from './components/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme === 'dark' ? 'dark-mode' : '';
  }, []);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const addOrUpdateBlog = (blog) => {
    if (editingBlog) {
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? blog : b)));
    } else {
      setBlogs((prev) => [...prev, { ...blog, id: Date.now() }]);
    }
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const cancelEditing = () => {
    setEditingBlog(null);
    setShowForm(false);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container className="py-4">
    <div className="mb-3">
      <h2 className="text-primary fw-bold">📝My Notes</h2>
    </div>

    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4 flex-wrap">
      <motion.div
        className="flex-grow-1 w-100"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Button
          variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
          onClick={toggleTheme}
          className="me-2"
        >
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {!showForm && (
          <Button variant="outline-success" onClick={() => setShowForm(true)}>
            ➕ Add New Notes
          </Button>
        )}
      </motion.div>
    </div>

    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <BlogForm
            onSave={addOrUpdateBlog}
            blogToEdit={editingBlog}
            onCancel={cancelEditing}
          />
        </motion.div>
      )}
    </AnimatePresence>

    <Row xs={1} md={2} lg={3} className="g-4 mt-2">
      <BlogList blogs={filteredBlogs} onEdit={handleEdit} />
    </Row>
  </Container>

  );
}

export default App;
