import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/Home/Carousel";
import axios from "axios";
import AnimeCards from "../components/Home/AnimeCards";
import HomeSkeleton from "../components/skeletons/CarouselSkeleton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import WatchingEpisodes from "../components/Home/WatchingEpisodes";
import { TrendingAnimeQuery } from "../hooks/searchQueryStrings";

function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    window.scrollTo(0, 0);
    let result = await axios({
      url: process.env.REACT_APP_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: TrendingAnimeQuery,
        variables: {
          page: 1,
          perPage: 15,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setImages(result.data.data.Page.media);
    setLoading(false);
    document.title = "Miyou - Watch Anime Free Online With English Sub and Dub";
  }

  function checkSize() {
    let lsData = localStorage.getItem("Watching");
    lsData = JSON.parse(lsData);
    if (lsData.length === 0) {
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
        {localStorage.getItem("Watching") && checkSize() && (
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
              <span>Trending</span> Now
            </Heading>
            <Links to="/trending/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="airing" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Popular
            </Heading>
            <Links to="/popular/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="bypopularity" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Top 100</span> Anime
            </Heading>
            <Links to="/top100/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="all" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Favourite
            </Heading>
            <Links to="/favourites/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="favorite" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Popular</span> Movies
            </Heading>
            <Links to="/movies">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="movie" />
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
  font-weight: 200;

  span {
    font-weight: 600;
  }
  margin-bottom: 1rem;

  @media screen and (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-top: 1rem;
  span {
    font-weight: 600;
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
