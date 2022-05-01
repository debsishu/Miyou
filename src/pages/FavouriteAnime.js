import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function FavouriteAnime() {
  const [animeDetails, setAnimeDetails] = useState([]);

  useEffect(() => {
    getAnime();
  }, []);

  async function getAnime() {
    let res = await axios.get(
      "https://miyou-api.herokuapp.com/api/favourite?page=1&count=50"
    );
    setAnimeDetails(res.data.data.Page.media);
  }
  return (
    <Parent>
      <Heading>
        <span>Favourite Anime</span> Results
      </Heading>
      <CardWrapper>
        {animeDetails.map((item, i) => (
          <Links
            to={
              "/search/" +
              (item.title.userPreferred !== null
                ? item.title.userPreferred
                : item.title.romaji)
            }
          >
            <img src={item.coverImage.large} alt="" />
            <p>
              {item.title.english !== null
                ? item.title.english
                : item.title.userPreferred}
            </p>
          </Links>
        ))}
      </CardWrapper>
    </Parent>
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
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;
`;

const Links = styled(Link)`
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

export default FavouriteAnime;
