import React from "react";
import styled from "styled-components";

import greyThumbnail from "../images/greyThumbnail.jpg";

const StyledCard = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
`;

const ImageWrapper = styled.div`
  background-image: url('${(props) => props.image}');
  height: 100%;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ContentWrapper = styled.div`
  height: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.p`
  font-weight: bold;
  margin: 0px;
`;

const Time = styled.p`
  font-size: 10px;
  margin: 0px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #000000;

  &:hover ${Title} {
    color: #ff4500;
  }
`;

const Author = styled.a`
  text-decoration: none;
  color: #000000;
  margin: 0px;

  &:hover {
    text-decoration: underline;
  }
`;

function Card({ post }) {
  if (post.thumbnail === "self" || null || post.thumbnail === "default") {
    post.thumbnail = greyThumbnail;
  }

  let date = new Date(post.created_utc * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime =
    day +
    "/" +
    month +
    "/" +
    year +
    " | " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  return (
    <StyledCard>
      <ImageWrapper image={post.thumbnail} />
      <ContentWrapper>
        <Link href={post.url} target="_blank" rel="noopener noreferrer">
          <Title>{post.title}</Title>
        </Link>
        <Author
          href={`https://reddit.com/user/${post.author}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {post.author}
        </Author>
        <Time>{formattedTime}</Time>
      </ContentWrapper>
    </StyledCard>
  );
}

export default Card;
