import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import AnimeDetailsSkeleton from "../components/skeletons/AnimeDetailsSkeleton";
import useWindowDimensions from "../hooks/useWindowDimensions";

function AnimeDetails() {
  let slug = useParams().slug;
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { height, width } = useWindowDimensions();
  const [localStorageDetails, setLocalStorageDetails] = useState(0);

  useEffect(() => {
    getAnimeDetails();
  }, []);

  async function getAnimeDetails() {
    setLoading(true);
    setExpanded(false);
    window.scrollTo(0, 0);
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/getanime?link=/category/${slug}`
    );
    setLoading(false);
    setAnimeDetails(res.data);
    getLocalStorage(res.data);
    document.title = res.data[0].gogoResponse.title + " - Miyou"
  }

  function readMoreHandler() {
    setExpanded(!expanded);
  }

  function getLocalStorage(animeDetails) {
    if (localStorage.getItem("Animes")) {
      let lsData = localStorage.getItem("Animes");
      lsData = JSON.parse(lsData);

      let index = lsData.Names.findIndex(
        (i) => i.name === animeDetails[0].gogoResponse.title
      );

      if (index !== -1) {
        setLocalStorageDetails(lsData.Names[index].currentEpisode);
      }
    }
  }

  return (
    <div>
      {loading && <AnimeDetailsSkeleton />}
      {!loading && (
        <Content>
          {animeDetails.length > 0 && (
            <div>
              <Banner
                src={
                  animeDetails[0].anilistResponse !== "NONE" &&
                  animeDetails[0].anilistResponse.anilistBannerImage !== null
                    ? animeDetails[0].anilistResponse.anilistBannerImage
                    : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg"
                }
                alt=""
              />
              <ContentWrapper>
                <Poster>
                  <img src={animeDetails[0].gogoResponse.image} alt="" />
                  {localStorageDetails === 0 && (
                    <Button
                      to={"/watch" + animeDetails[0].gogoResponse.episodes[0]}
                    >
                      Watch Now
                    </Button>
                  )}
                  {localStorageDetails !== 0 && (
                    <Button
                      to={
                        "/watch" +
                        animeDetails[0].gogoResponse.episodes[
                          localStorageDetails - 1
                        ]
                      }
                    >
                      EP - {localStorageDetails}
                    </Button>
                  )}
                </Poster>
                <div>
                  <h1>{animeDetails[0].gogoResponse.title}</h1>
                  <p>
                    <span>Type: </span>
                    {animeDetails[0].gogoResponse.type.replace("Type:", "")}
                  </p>
                  {width <= 600 && expanded && (
                    <p>
                      <span>Plot Summery: </span>
                      {animeDetails[0].gogoResponse.description.replace(
                        "Plot Summary:",
                        ""
                      )}
                      <button onClick={() => readMoreHandler()}>
                        read less
                      </button>
                    </p>
                  )}
                  {width <= 600 && !expanded && (
                    <p>
                      <span>Plot Summery: </span>
                      {animeDetails[0].gogoResponse.description
                        .replace("Plot Summary:", "")
                        .substring(0, 200) + "... "}
                      <button onClick={() => readMoreHandler()}>
                        read more
                      </button>
                    </p>
                  )}
                  {width > 600 && (
                    <p>
                      <span>Plot Summery: </span>
                      {animeDetails[0].gogoResponse.description.replace(
                        "Plot Summary:",
                        ""
                      )}
                    </p>
                  )}

                  <p>
                    <span>Genre: </span>
                    {animeDetails[0].gogoResponse.genre.replace("Genre:", "")}
                  </p>
                  <p>
                    <span>Released: </span>
                    {animeDetails[0].gogoResponse.released.replace(
                      "Released:",
                      ""
                    )}
                  </p>
                  <p>
                    <span>Status: </span>
                    {animeDetails[0].gogoResponse.status.replace("Status:", "")}
                  </p>
                  <p>
                    <span>Number of Episodes: </span>
                    {animeDetails[0].gogoResponse.numOfEpisodes}
                  </p>
                </div>
              </ContentWrapper>
              <Episode>
                <h2>Episodes</h2>
                {width <= 600 && (
                  <Episodes>
                    {animeDetails[0].gogoResponse.episodes.map((item, i) => (
                      <EpisodeLink
                        style={
                          i < localStorageDetails - 1
                            ? { backgroundColor: "#7676ff" }
                            : {}
                        }
                        to={"/watch" + item}
                      >
                        {i + 1}
                      </EpisodeLink>
                    ))}
                  </Episodes>
                )}
                {width > 600 && (
                  <Episodes>
                    {animeDetails[0].gogoResponse.episodes.map((item, i) => (
                      <EpisodeLink
                        style={
                          i < localStorageDetails - 1
                            ? { backgroundColor: "#7676ff" }
                            : {}
                        }
                        to={"/watch" + item}
                      >
                        Episode {i + 1}
                      </EpisodeLink>
                    ))}
                  </Episodes>
                )}
              </Episode>
            </div>
          )}
        </Content>
      )}
    </div>
  );
}

const Episode = styled.div`
  margin: 0 4rem 0 4rem;
  padding: 2rem;
  outline: 2px solid #272639;
  border-radius: 0.5rem;
  color: white;

  h2 {
    font-size: 1.4rem;
    text-decoration: underline;
    margin-bottom: 1rem;
  }
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);

  @media screen and (max-width: 600px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  }
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.9rem 2rem;
  font-family: "Gilroy-Medium", sans-serif;
  border-radius: 0.5rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #7676ff;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 0.3rem;
    font-family: "Gilroy-Bold", sans-serif;
  }
`;

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
  display: flex;

  div > * {
    margin-bottom: 0.6rem;
  }

  div {
    margin: 1rem;
    font-size: 1rem;
    color: #b5c3de;
    font-family: "Gilroy-Regular", sans-serif;
    span {
      font-family: "Gilroy-Bold", sans-serif;
      color: white;
    }
    p {
      text-align: justify;
    }
    h1 {
      font-family: "Gilroy-Bold", sans-serif;
      font-weight: normal;
      color: white;
    }
    button {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
    div {
      margin: 1rem;
      margin-bottom: 0.2rem;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1rem;
      }
      button {
        display: inline;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: underline;
        font-family: "Gilroy-Bold", sans-serif;
        font-size: 1rem;
        color: white;
      }
    }
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    position: relative;
    top: -20%;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
  @media screen and (max-width: 600px) {
    img {
      display: none;
    }
  }
`;

const Button = styled(Link)`
  font-size: 1.3rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #7676ff;
  font-family: "Gilroy-Bold", sans-serif;
  border-radius: 0.4rem;
  position: relative;
  top: -25%;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    height: 13rem;
    border-radius: 0.5rem;
  }
`;

export default AnimeDetails;
