import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import AnimeDetailsSkeleton from "../components/skeletons/AnimeDetailsSkeleton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { searchByIdQuery } from "../hooks/searchQueryStrings";

function MalAnimeDetails() {
  let id = useParams().id;

  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [anilistResponse, setAnilistResponse] = useState();
  const [malResponse, setMalResponse] = useState();
  const [expanded, setExpanded] = useState(false);
  const [dub, setDub] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

  function readMoreHandler() {
    setExpanded(!expanded);
  }

  async function getInfo() {
    if (id === "null") {
      setNotAvailable(true);
      return;
    }
    let aniRes = await axios({
      url: process.env.REACT_APP_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchByIdQuery,
        variables: {
          id,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setAnilistResponse(aniRes.data.data.Media);
    let malRes = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/getidinfo?malId=${id}`)
      .catch((err) => {
        setNotAvailable(true);
      });
    setMalResponse(malRes.data);
    setLoading(false);
  }

  return (
    <div>
      {notAvailable && (
        <NotAvailable>
          <img src="./assets/404.png" alt="404" />
          <h1>Oops! This Anime Is Not Available</h1>
        </NotAvailable>
      )}
      {loading && !notAvailable && <AnimeDetailsSkeleton />}
      {!loading && !notAvailable && (
        <Content>
          {anilistResponse !== undefined && (
            <div>
              <Banner
                src={
                  anilistResponse.bannerImage !== null
                    ? anilistResponse.bannerImage
                    : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg"
                }
                alt=""
              />
              <ContentWrapper>
                <Poster>
                  <img src={anilistResponse.coverImage.extraLarge} alt="" />
                  <Button to={`/play/${malResponse.subLink}/1`}>
                    Watch Sub
                  </Button>
                  {malResponse.isDub && (
                    <Button
                      className="outline"
                      to={`/play/${malResponse.dubLink}/1`}
                    >
                      Watch Dub
                    </Button>
                  )}
                </Poster>
                <div>
                  <h1>{anilistResponse.title.userPreferred}</h1>
                  {anilistResponse.title.english != null && (
                    <h3>{"English - " + anilistResponse.title.english}</h3>
                  )}
                  <p>
                    <span>Type: </span>
                    {anilistResponse.type}
                  </p>
                  {width <= 600 && expanded && (
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `<span>Plot Summery: </span>${anilistResponse.description}`,
                        }}
                      ></p>
                      <button onClick={() => readMoreHandler()}>
                        read less
                      </button>
                    </section>
                  )}

                  {width <= 600 && !expanded && (
                    <p>
                      <span>Plot Summery: </span>
                      {anilistResponse.description.substring(0, 200) + "... "}
                      <button onClick={() => readMoreHandler()}>
                        read more
                      </button>
                    </p>
                  )}
                  {width > 600 && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          "<span>Plot Summery: </span>" +
                          anilistResponse.description,
                      }}
                    ></p>
                  )}

                  <p>
                    <span>Genre: </span>
                    {anilistResponse.genres.toString()}
                  </p>
                  <p>
                    <span>Released: </span>
                    {anilistResponse.startDate.year}
                  </p>
                  <p>
                    <span>Status: </span>
                    {anilistResponse.status}
                  </p>
                  <p>
                    <span>Number of Sub Episodes: </span>
                    {malResponse.subTotalEpisodes}
                  </p>
                  {malResponse.isDub && (
                    <p>
                      <span>Number of Dub Episodes: </span>
                      {malResponse.dubTotalEpisodes}
                    </p>
                  )}
                </div>
              </ContentWrapper>
              <Episode>
                <DubContainer>
                  <h2>Episodes</h2>
                  {malResponse.isDub && (
                    <div class="switch">
                      <label for="switch">
                        <input
                          type="checkbox"
                          id="switch"
                          onChange={(e) => setDub(!dub)}
                        ></input>
                        <span class="indicator"></span>
                        <span class="label">{dub ? "Dub" : "Sub"}</span>
                      </label>
                    </div>
                  )}
                </DubContainer>
                {width > 600 && (
                  <Episodes>
                    {malResponse.isDub &&
                      dub &&
                      [...Array(malResponse.dubTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                          to={`/play/${malResponse.dubLink}/${parseInt(i) + 1}`}
                        >
                          Episode {i + 1}
                        </EpisodeLink>
                      ))}

                    {!dub &&
                      [...Array(malResponse.subTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                          to={`/play/${malResponse.subLink}/${parseInt(i) + 1}`}
                        >
                          Episode {i + 1}
                        </EpisodeLink>
                      ))}
                  </Episodes>
                )}
                {width <= 600 && (
                  <Episodes>
                    {malResponse.isDub &&
                      dub &&
                      [...Array(malResponse.dubTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                          to={`/play/${malResponse.dubLink}/${parseInt(i) + 1}`}
                        >
                          {i + 1}
                        </EpisodeLink>
                      ))}

                    {!dub &&
                      [...Array(malResponse.subTotalEpisodes)].map((x, i) => (
                        <EpisodeLink
                          to={`/play/${malResponse.subLink}/${parseInt(i) + 1}`}
                        >
                          {i + 1}
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

const NotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  img {
    width: 30rem;
  }

  h1 {
    margin-top: -2rem;
    font-family: "Gilroy-Bold", sans-serif;
  }

  @media screen and (max-width: 600px) {
    img {
      width: 18rem;
    }

    h1 {
      font-size: 1.3rem;
    }
  }
`;

const DubContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;

  .switch {
    position: relative;

    label {
      display: flex;
      align-items: center;
      font-family: sans-serif;
      cursor: pointer;
    }

    .label {
      margin-bottom: 0.5rem;
      font-family: "Gilroy-Medium", sans-serif;
    }

    .indicator {
      position: relative;
      width: 60px;
      height: 30px;
      background: #242235;
      border: 2px solid #393653;
      display: block;
      border-radius: 30px;
      margin-right: 10px;
      margin-bottom: 10px;

      &:before {
        width: 22px;
        height: 22px;
        content: "";
        display: block;
        background: #7676ff;
        border-radius: 26px;
        transform: translate(2px, 2px);
        position: relative;
        z-index: 2;
        transition: all 0.5s;
      }
    }
    input {
      visibility: hidden;
      position: absolute;

      &:checked {
        & + .indicator {
          &:before {
            transform: translate(32px, 2px);
          }
          &:after {
            width: 54px;
          }
        }
      }
    }
  }
`;

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

  .outline {
    background-color: transparent;
    border: 2px solid #9792cf;
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

export default MalAnimeDetails;
