import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../BlogList.css'; // Custom styles

const BlogList = ({ blogs, onEdit }) => {
  if (!blogs.length) {
    return <p className="text-muted text-center">No notes to show.</p>;
  }

  return (
    <>
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="mb-3 blog-card animated-card shadow-effect">
            <Card.Body>
              <Card.Title className="blog-header fs-5 rainbow-text">
                {blog.header}
              </Card.Title>

              <Card.Text className="blog-body text-secondary dark-body">
                → {blog.body}
              </Card.Text>

              {blog.tags.length > 0 && (
                <div className="mb-2">
                  {blog.tags.map((tag, idx) => (
                    <Badge bg="info" key={idx} className="me-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Button
                variant="outline-light"
                className="edit-button"
                onClick={() => onEdit(blog)}
              >
                ✏️ Edit
              </Button>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </>
  );
};

export default BlogList;
