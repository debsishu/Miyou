import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/Home/Carousel";
import axios from "axios";
import AnimeCards from "../components/Home/AnimeCards";

function Home() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    let result = await axios.get(
      "https://miyou-api.herokuapp.com/api/trending?page=1&count=10"
    );
    setImages(result.data.data.Page.media);
  }
  return (
    <HomeDiv>
      <HomeHeading>
        <span>Recommended</span> to you
      </HomeHeading>
      <Carousel images={images} />
      <div>
        <HeadingWrapper>
          <Heading>
            <span>All Time</span> Popular
          </Heading>
          <Link
            style={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "'Gilroy-Medium', sans-serif",
            }}
            to="/popular"
          >
            View All
          </Link>
        </HeadingWrapper>
        <AnimeCards count="15" criteria="popular" />
      </div>
      <div>
        <HeadingWrapper>
          <Heading>
            <span>Trending</span> Now
          </Heading>
          <Link
            style={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "'Gilroy-Medium', sans-serif",
            }}
            to="/trending"
          >
            View All
          </Link>
        </HeadingWrapper>
        <AnimeCards count="15" criteria="trending" />
      </div>
      <div>
        <HeadingWrapper>
          <Heading>
            <span>Top 100</span> Anime
          </Heading>
          <Link
            style={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "'Gilroy-Medium', sans-serif",
            }}
            to="/top100"
          >
            View All
          </Link>
        </HeadingWrapper>
        <AnimeCards count="15" criteria="top100" />
      </div>
      <div>
        <HeadingWrapper>
          <Heading>
            <span>All Time</span> Favourite
          </Heading>
          <Link
            style={{
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "'Gilroy-Medium', sans-serif",
            }}
            to="/top100"
          >
            View All
          </Link>
        </HeadingWrapper>
        <AnimeCards count="15" criteria="favourite" />
      </div>
    </HomeDiv>
  );
}

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
`;

const HomeHeading = styled.p`
  font-size: 2.3rem;
  color: white;
  font-family: "Gilroy-Light", sans-serif;

  span {
    font-family: "Gilroy-Bold", sans-serif;
  }
  margin-bottom: 1rem;
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-family: "Gilroy-Light", sans-serif;

  span {
    font-family: "Gilroy-Bold", sans-serif;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export default Home;
