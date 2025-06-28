import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import SearchBar from './components/SearchBar';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

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
      <h2 className="text-center mb-4 text-primary fw-bold"> Blog App</h2>


      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      {!showForm && (
        <div className="text-center mb-4">
          <Button variant="outline-success" onClick={() => setShowForm(true)}>
            ➕ Add New Blog
          </Button>
        </div>
      )}

      {showForm && (
        <BlogForm
          onSave={addOrUpdateBlog}
          blogToEdit={editingBlog}
          onCancel={cancelEditing}
        />
      )}

    

      <Row xs={1} md={2} lg={3} className="g-4">
        <BlogList blogs={filteredBlogs} onEdit={handleEdit} />
      </Row>
    </Container>
  );
}

export default App;
