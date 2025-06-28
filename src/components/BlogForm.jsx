import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Badge } from 'react-bootstrap';

const BlogForm = ({ onSave, blogToEdit, onCancel }) => {
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (blogToEdit) {
      setHeader(blogToEdit.header);
      setBody(blogToEdit.body);
    } else {
      setHeader('');
      setBody('');
    }
  }, [blogToEdit]);

  useEffect(() => {
    const extractedTags = Array.from(new Set(body.match(/#\w+/g))) || [];
    setTags(extractedTags);
  }, [body]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      id: blogToEdit?.id || Date.now(),
      header,
      body,
      tags
    };
    onSave(blogData);
  };

  return (
    <Card className="mb-4 shadow-lg">
      <Card.Header className="bg-primary text-white fw-bold">
        {blogToEdit ? 'Update Blog' : 'Add Blog'}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Header</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Write blog content here... Use #hashtags to tag."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </Form.Group>

          {tags.length > 0 && (
            <div className="mb-3">
              <Form.Label className="fw-semibold">Detected Tags:</Form.Label>
              <div>
                {tags.map((tag, index) => (
                  <Badge key={index} bg="info" className="me-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex">
            <Button type="submit" variant="success" className="me-2">
              {blogToEdit ? 'Update' : 'Add'}
            </Button>
            {blogToEdit && (
              <Button variant="outline-secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BlogForm;
