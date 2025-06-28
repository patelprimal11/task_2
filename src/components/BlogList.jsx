import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import '../BlogList.css'; // Import the styles

const BlogList = ({ blogs, onEdit }) => {
  if (!blogs.length) return <p className="text-muted">No blogs to show.</p>;

  return (
    <>
      {blogs.map((blog) => (
        <Card key={blog.id} className="mb-3 blog-card shadow-sm">
          <Card.Body>
            <Card.Title id='blog-header' className="blog-header ">{blog.header}</Card.Title>
            <Card.Text id='blog-body' className="blog-body b">→ {blog.body}</Card.Text>
            <div className="mb-2">
              {blog.tags.map((tag, idx) => (
                <Badge bg="info" key={idx} className="me-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button variant="outline-primary" onClick={() => onEdit(blog)}>
              ✏️ Edit
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default BlogList;
