import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/item_card.css";
import "../css/mylisting.css";
import Axios from "axios";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";
import process from "../Components/constant";
export default function Feed() {
  setConstraint(true);
  // console.log(constraint.LOGGED_IN);
  const [item, setitem] = useState("");
  const [Found_item, setFound_item] = useState();
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };
  useEffect(() => {
    // console.log("Test");
    Axios({
      url: `${process.env.URL}/mylistings/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data.postitems);
        // console.log(response);
        let data = response.data.item;
        // console.log(response.data);
        let items = [];
        let Found_items = [];
        data.reverse().map((item) => {
          let created_date = new Date(item.createdAt);
          // console.log(date.toString());
          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();

          items.push(
            <a href={`/${item.name}?cid=${item._id}&type=${item.type}/true`}>
              <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
                {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                <Card bsPrefix="item-card" style={{ maxHeight: "465px" }}>
                  <Card.Img
                    variant="top"
                    src={`${
                      item.itemPictures.length > 0
                        ? item.itemPictures[0].img
                        : "No image found"
                    }`}
                  />
                  <Card.Body bsPrefix="card-body">
                    {item.status ? (
                      <>
                        {" "}
                        <Badge pill variant="success">
                          Active
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Badge pill variant="secondary">
                          Inactive
                        </Badge>
                      </>
                    )}
                    <Card.Title>Item :{item.name}</Card.Title>
                    {/* <Card.Text>Type :{item.type}</Card.Text> */}
                    {item.description ? (
                      <Card.Text>
                        Description :<ReadMore>{item.description}</ReadMore>
                      </Card.Text>
                    ) : (
                      ""
                    )}
                    <Card.Text>Type : {item.type}</Card.Text>
                    <Card.Text>Created at : {createdAt}</Card.Text>
                    {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                  </Card.Body>
                  {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body> */}
                </Card>
              </Col>
            </a>
          );

          // var user1 = false;
          // if (item.createdBy === user_info._id) {
          //   user1=true
          // }
          // console.log("Lost item "+user1+item.name)
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="listing-title">
        <h2>My Listings</h2>
        <div className="title-border"></div>
      </div>
      <div>
        <Container fluid>
          <Row>{item}</Row>
        </Container>
      </div>
    </div>
  );
}
