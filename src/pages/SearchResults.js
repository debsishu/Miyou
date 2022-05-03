import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";

function SearchResults() {
  let urlParams = useParams().name;
  urlParams = urlParams.replace(":", "").replace("(", "").replace(")", "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResults();
  }, [urlParams]);

  async function getResults() {
    setLoading(true);
    let res = await axios.get(
      `https://miyou-api.herokuapp.com/api/search?name=${urlParams}`
    );
    setLoading(false);
    setResults(res.data);
  }
  return (
    <div>
      {loading && <SearchResultsSkeleton />}
      {!loading && (
        <Parent>
          <Heading>
            <span>Search</span> Results
          </Heading>
          <CardWrapper>
            {results.map((item, i) => (
              <Wrapper to={item.link}>
                <img src={item.image} alt="" />
                <p>{item.title}</p>
              </Wrapper>
            ))}
          </CardWrapper>
          {results.length === 0 && <h2>No Search Results Found</h2>}
        </Parent>
      )}
    </div>
  );
}

const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  h2 {
    color: white;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

const CardWrapper = styled.div`
  /* display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  row-gap: 2rem;
  column-gap: 2rem;

  ::after {
    content: "";
    flex: auto;
  } */

  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;
`;

const Wrapper = styled(Link)`
  text-decoration: none;
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  p {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
    text-decoration: none;
    max-width: 160px;
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-family: "Gilroy-Light", sans-serif;
  margin-bottom: 2rem;
  span {
    font-family: "Gilroy-Bold", sans-serif;
  }
`;

export default SearchResults;
