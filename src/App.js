import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Card from "./components/Card";

const Wrapper = styled.div`
  margin: 30px;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const History = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  h1 {
    margin: 0px;
  }
`;

const Title = styled.h1`
  color: #ff4500;
`;

const SearchBox = styled.input`
  max-width: 300px;
`;

const SearchButton = styled.button`
  max-width: 300px;
  margin-bottom: 30px;
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [inputValue, setValue] = useState("all");
  const [subreddit, setSubreddit] = useState("all");
  const [bundle, setBundle] = useState([]);

  const handleSearchInputChanges = (e) => {
    setValue(e.target.value);
  };

  const callSearchFunction = () => {
    setSubreddit(inputValue);
    setBundle([...bundle, subreddit]);
  };

  const backOnHistory = (e) => {
    console.log(e.target.innerText);
    setSubreddit(e.target.innerText);
    setBundle([...bundle, subreddit]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios.get(`https://www.reddit.com/r/${subreddit}.json`).then((res) => {
        const posts = res.data.data.children.map((obj) => obj.data);
        setPosts(posts);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, setPosts, subreddit]);

  return (
    <Wrapper>
      <Title>Reddit Search</Title>
      <SearchBox
        type="text"
        value={inputValue}
        onChange={handleSearchInputChanges}
      />
      <SearchButton type="submit" onClick={callSearchFunction}>
        SEARCH
      </SearchButton>
      <SubWrapper>
        <PostsContainer>
          {posts.map((post) => {
            return <Card key={post.id} post={post} />;
          })}
        </PostsContainer>
        <History>
          <h1>History</h1>
          {bundle.map((item) => {
            return <p onClick={backOnHistory}>{item}</p>;
          })}
        </History>
      </SubWrapper>
    </Wrapper>
  );
}

export default App;
