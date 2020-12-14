import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "reactstrap";
import "../CSS/Homepage.css";

const Homepage = (props) => {
  const [people, setPeople] = useState([]);

  const fetchResults = () => {
    let url = "http://localhost:3001/user";
    fetch(url, {
      headers: new Headers({
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then(setPeople);
  };

  useEffect(fetchResults, []);

  const formatDate = (date, year) => {
    // let numberOne = date.split("/")[0];
    // let numberTwo = date.split("/")[1];
    // if (Number(numberOne) < 10) numberOne = "0" + numberOne;
    // if (Number(numberTwo) < 10) numberTwo = "0" + numberTwo;
    // let formatted = numberOne + "/" + numberTwo;
    if (year) date = date + "/" + year;

    let newDate = new Date(date);
    let dateString = newDate.toDateString();

    console.log(dateString);

    if (year) {
      return dateString.split(" ").slice(1, 4).join(" ");
    } else {
      return dateString.split(" ").slice(1, 3).join(" ");
    }
  };

  const getAge = (date, year) => {
    if (year) date = date + "/" + year;
    let newDate = new Date(date);

    let diff = Date.now() - newDate.getTime();
    diff -= 1000 * 60 * 60 * 24;
    let ageDt = new Date(diff);

    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  return people.map((person) => {
    return (
      <Card>
        <CardHeader>
          <div className="header">
            <span>
              {!person.born
                ? `${person.last.trim()} baby on the way!`
                : `${
                    person.year
                      ? `${getAge(person.birth, person.year)} years old`
                      : "Over 18 years old"
                  }`}
            </span>
            <span>{formatDate(person.birth, person.year)}</span>
          </div>
          <h1>
            <span
              className={
                person.gender == "male"
                  ? "male"
                  : person.gender == "female"
                  ? "female"
                  : "unknownGender"
              }
            >
              {person.first ? person.first.trim() : "Name not decided yet!"}
            </span>{" "}
            <span className="last">
              {person.born ? person.last.trim() : null}
            </span>
          </h1>
        </CardHeader>
      </Card>
    );
  });
};

export default Homepage;
