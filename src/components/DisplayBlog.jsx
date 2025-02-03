import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import style from "./DisplayBlog.module.css";
import image1 from "../Images/blogimg.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
function DisplayBlog({ data }) {
  let { id } = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  //Handle Post Comments section
  const handlePostComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  //Single Blog
  useEffect(() => {
    const filterData = data.filter((item) => {
      return item.id === id;
    });
    setSingleBlog(filterData);
  }, [data, id]);

  //Other Blogs
  useEffect(() => {
    const OtherfilterData = data.filter((item) => {
      return item.id !== id;
    });

    setOtherBlogs(OtherfilterData);
  }, [data, id]);
  const handleReadmore = (id) => {
    const filterData1 = data.filter((item) => {
      return item.id === id;
    });
    setSingleBlog(filterData1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Container>
        <Row className=" p-3">
          <Col xs={8} className="p-2">
            <img src={image1} style={{ width: "100%", marginBottom: "2rem" }} />
            <h2 style={{ marginBottom: "1rem" }}> {singleBlog[0]?.title}</h2>
            <p>{singleBlog[0]?.content}</p>
            <div className={`${style.commentSection} container-fluid  p-2`}>
              <textarea
                className={`w-100 p-2`}
                placeholder="add your comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                rows={5}
              ></textarea>
              <button
                className="btn btn-primary mt-2"
                onClick={handlePostComment}
              >
                Post Comment
              </button>
            </div>
            <div className="container mt-3">
              <h1>All Comments here*</h1>
              {comments.map((item, index) => {
                return (
                  <>
                    <p>{item}</p>
                  </>
                );
              })}
            </div>
          </Col>

          <Col xs={4} className="p-3 ">
            {otherBlogs.map((item) => {
              return (
                <>
                  <Row className="m-2 p-3 w-100 ">
                    <Col>
                      <Card style={{ width: "100%" }}>
                        <Card.Img variant="top" src={image1} />
                        <Card.Body>
                          <Card.Title>{item.title.slice(0, 50)}</Card.Title>
                          <Card.Text>{item.content.slice(0, 100)}</Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => handleReadmore(item.id)}
                          >
                            Read More
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DisplayBlog;
