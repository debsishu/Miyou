import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";
import { searchAnimeQuery } from "../hooks/searchQueryStrings";

function SearchResults() {
  let urlParams = useParams().name;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResults();
  }, [urlParams]);

  async function getResults() {
    setLoading(true);
    window.scrollTo(0, 0);
    let res = await axios({
      url: process.env.REACT_APP_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchAnimeQuery,
        variables: {
          search: urlParams,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setLoading(false);
    setResults(res.data.data.Page.media);
    document.title = urlParams + " - Miyou";
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
              <Wrapper to={`/id/${item.idMal}`}>
                <img src={item.coverImage.extraLarge} alt="" />
                <p>
                  {item.title.english !== null
                    ? item.title.english
                    : item.title.userPreferred}
                </p>
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
  }
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }
`;

const Wrapper = styled(Link)`
  text-decoration: none;
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
      border-radius: 0.3rem;
    }
    @media screen and (max-width: 400px) {
      width: 110px;
      height: 170px;
    }
    @media screen and (max-width: 380px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
    max-width: 160px;
    @media screen and (max-width: 380px) {
      width: 100px;
      font-size: 0.9rem;
    }
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-bottom: 2rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

export default SearchResults;
