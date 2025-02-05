import React from "react";
import style from "../components/Blogs.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
const Blogs = ({ item }) => {
  const navigate = useNavigate();
  const handleReadmore = (id) => {
    navigate(`/displayblog/${id}`);
  };

  return (
    <>
      <Card
        className={`${style.blogCard} shadow  bg-body rounded`}
        style={{ width: "18rem" }}
      >
        <Card.Img
          variant="top"
          src={item.image}
          style={{ minHeight: "200px", maxHeight: "200px" }}
        />
        <Card.Body>
          <div className={style.blgsTitleAndContent}>
            <Card.Title>{item.title.slice(0, 50)}</Card.Title>
            <Card.Text>{item.content.slice(0, 100)}</Card.Text>
          </div>
          <Button variant="primary" onClick={() => handleReadmore(item.id)}>
            Read More
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Blogs;
