import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BlogList.css";
 
const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const trimToWords = (htmlContent, wordLimit = 20) => {
  const text = stripHtml(htmlContent);
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const formatDateTime = (isoString) => {
  if (!isoString) return "Not available";
  try {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return "Invalid date";
  }
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://ahaansoftware.com/blog-db.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setBlogs(data.reverse()))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://ahaansoftware.com/${imagePath}`;
  };

  return (
    <Container className="py-5">
      <Row>
        {blogs.map((blog) => (
          <Col md={6} lg={4} key={blog.id} className="mb-4">
            <Card className="blog-card h-100 shadow-sm border-0">
              {blog.image && (
                <Card.Img
                  variant="top"
                  src={getFullImageUrl(blog.image)}
                  alt={blog.title}
                  className="blog-image"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="blog-post-title">
                  {blog.title}
                </Card.Title>

                {/* ✅ Author info section */}
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={getFullImageUrl(blog.author_image)}
                    alt={blog.author}
                    className="rounded-circle me-2 author-img"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div>
                    <p className="mb-0 fw-semibold text-dark">
                      {blog.author || "Unknown"}
                    </p>
                    <small className="text-muted">
                      {formatDateTime(blog.created_at)}
                    </small>
                  </div>
                </div>

                <Card.Text className="blog-content mt-2">
                  {trimToWords(blog.content)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogList;
