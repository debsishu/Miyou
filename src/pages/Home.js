import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/Home/Carousel";
import axios from "axios";
import AnimeCards from "../components/Home/AnimeCards";
import HomeSkeleton from "../components/skeletons/CarouselSkeleton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import WatchingEpisodes from "../components/Home/WatchingEpisodes";

function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    window.scrollTo(0, 0);
    let result = await axios.get(
      "https://miyou-api.herokuapp.com/api/trending?page=1&count=15"
    );
    setImages(result.data.data.Page.media);
    setLoading(false);
  }

  function checkSize() {
    let lsData = localStorage.getItem("Animes");
    lsData = JSON.parse(lsData);
    if (lsData.Names.length === 0) {
      return false;
    }
    return true;
  }
  return (
    <div>
      <HomeDiv>
        <HomeHeading>
          <span>Recommended</span> to you
        </HomeHeading>
        {loading && <HomeSkeleton />}
        {!loading && <Carousel images={images} />}
        {localStorage.getItem("Animes") && checkSize() && (
          <div>
            <HeadingWrapper>
              <Heading>
                <span>Continue</span> Watching
              </Heading>
            </HeadingWrapper>
            <WatchingEpisodes />
          </div>
        )}
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Popular
            </Heading>
            <Links to="/popular">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="popular" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Trending</span> Now
            </Heading>
            <Links to="/trending">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="trending" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Top 100</span> Anime
            </Heading>
            <Links to="/top100">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="top100" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Favourite
            </Heading>
            <Links to="/favourites">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="favourite" />
        </div>
      </HomeDiv>
    </div>
  );
}

const Links = styled(Link)`
  color: white;
  font-size: 1.1rem;
  font-family: "Gilroy-Medium", sans-serif;
  @media screen and (max-width: 600px) {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;

const HomeHeading = styled.p`
  font-size: 2.3rem;
  color: white;
  font-family: "Gilroy-Light", sans-serif;

  span {
    font-family: "Gilroy-Bold", sans-serif;
  }
  margin-bottom: 1rem;

  @media screen and (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-family: "Gilroy-Light", sans-serif;

  span {
    font-family: "Gilroy-Bold", sans-serif;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

export default Home;
