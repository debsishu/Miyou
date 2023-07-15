import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { BiArrowToBottom, BiFullscreen } from "react-icons/bi";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import { IconContext } from "react-icons";
import WatchAnimeSkeleton from "../components/skeletons/WatchAnimeSkeleton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import { searchByIdQuery } from "../hooks/searchQueryStrings";
import toast from "react-hot-toast";

function WatchAnimeV2() {
  const mal_id = useParams().id;
  const slug = useParams().slug;
  const episode = useParams().episode;

  const [episodeLinks, setEpisodeLinks] = useState([]);
  const [currentServer, setCurrentServer] = useState("");
  const [animeDetails, setAnimeDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [fullScreen, setFullScreen] = useState(false);
  const [internalPlayer, setInternalPlayer] = useState(true);

  useEffect(() => {
    getEpisodeLinks();
  }, [episode]);

  async function getEpisodeLinks() {
    setLoading(true);
    window.scrollTo(0, 0);
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/getmixlinks?id=${slug}&ep=${episode}`
    );
    setEpisodeLinks(res.data);
    setCurrentServer(res.data.gogoLink);
    if (!res.data.sources) {
      setInternalPlayer(true);
    }
    updateLocalStorage(
      res.data.animeId,
      res.data.episodeNum,
      mal_id,
      res.data.isDub
    );
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
          id: mal_id,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setAnimeDetails(aniRes.data.data.Media);
    document.title = `${aniRes.data.data.Media.title.userPreferred} ${res.data.isDub ? "(Dub)" : "(Sub)"
      } EP-${episode} - Miyou`;
    setLoading(false);
  }

  function fullScreenHandler(e) {
    setFullScreen(!fullScreen);
    let video = document.getElementById("video");

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      window.screen.orientation.lock("landscape-primary");
    } else {
      document.exitFullscreen();
    }
  }

  function updateLocalStorage(animeId, episode, malId, isDub) {
    if (localStorage.getItem("Watching")) {
      let data = localStorage.getItem("Watching");
      data = JSON.parse(data);
      let index = data.findIndex((i) => i.animeId === animeId);
      if (index !== -1) {
        data.splice(index, 1);
      }
      data.unshift({
        animeId,
        episode,
        malId,
        isDub,
      });
      data = JSON.stringify(data);
      localStorage.setItem("Watching", data);
    } else {
      let data = [];
      data.push({
        animeId,
        episode,
        malId,
        isDub,
      });
      data = JSON.stringify(data);
      localStorage.setItem("Watching", data);
    }
  }

  return (
    <div>
      {loading && <WatchAnimeSkeleton />}
      {!loading && (
        <Wrapper>
          {episodeLinks && animeDetails && currentServer !== "" && (
            <div>
              <div>
                <Titles>
                  <p>
                    <span>{`${animeDetails.title.english !== null
                      ? animeDetails.title.english
                      : animeDetails.title.userPreferred
                      } ${episodeLinks.isDub ? "(Dub)" : "(Sub)"}`}</span>
                    {` Episode - ${episode}`}
                  </p>
                  {width <= 600 && (
                    <IconContext.Provider
                      value={{
                        size: "1.8rem",
                        style: {
                          verticalAlign: "middle",
                        },
                      }}
                    >
                      <a
                        href={episodeLinks.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BiArrowToBottom />
                      </a>
                    </IconContext.Provider>
                  )}
                  {width > 600 && (
                    <IconContext.Provider
                      value={{
                        size: "1.2rem",
                        style: {
                          verticalAlign: "middle",
                          marginBottom: "0.2rem",
                          marginLeft: "0.3rem",
                        },
                      }}
                    >
                      <a
                        href={episodeLinks.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                        <BiArrowToBottom />
                      </a>
                    </IconContext.Provider>
                  )}
                </Titles>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#b5c3de",
                    fontWeight: 300,
                  }}
                >
                  If the video player doesn't load or if blank refresh the page
                  or use the external server
                </p>
              </div>

              <VideoPlayerWrapper>
                <div>
                  {internalPlayer && (
                    <VideoPlayer
                      sources={episodeLinks.sources}
                      type={episodeLinks.type}
                      internalPlayer={internalPlayer}
                      setInternalPlayer={setInternalPlayer}
                      title={`${mal_id}EP${episodeLinks.episodeNum}${episodeLinks.isDub}`}
                      banner={animeDetails.bannerImage}
                      totalEpisodes={episodeLinks.totalEpisodes}
                      currentEpisode={episodeLinks.episodeNum}
                      malId={mal_id}
                    />
                  )}
                  {!internalPlayer && (
                    <div>
                      <Conttainer>
                        <IconContext.Provider
                          value={{
                            size: "1.5rem",
                            color: "white",
                            style: {
                              verticalAlign: "middle",
                            },
                          }}
                        >
                          <p>External Player (Contain Ads)</p>
                          <div>
                            <div className="tooltip">
                              <button
                                onClick={() => {
                                  toast.success(
                                    "Swtitched to Internal Player",
                                    {
                                      position: "top-center",
                                    }
                                  );
                                  setInternalPlayer(!internalPlayer);
                                }}
                              >
                                <HiOutlineSwitchHorizontal />
                              </button>
                              <span className="tooltiptext">Change Server</span>
                            </div>
                          </div>
                        </IconContext.Provider>
                      </Conttainer>
                      <IframeWrapper>
                        <iframe
                          id="video"
                          title={animeDetails.title.userPreferred}
                          src={currentServer}
                          allowfullscreen="true"
                          frameborder="0"
                          marginwidth="0"
                          marginheight="0"
                          scrolling="no"
                        ></iframe>
                        {width <= 600 && (
                          <div>
                            <IconContext.Provider
                              value={{
                                size: "1.8rem",
                                color: "white",
                                style: {
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              <BiFullscreen
                                onClick={(e) => fullScreenHandler(e)}
                              />
                            </IconContext.Provider>
                          </div>
                        )}
                      </IframeWrapper>
                    </div>
                  )}
                  <EpisodeButtons>
                    {width <= 600 && (
                      <IconContext.Provider
                        value={{
                          size: "1.8rem",
                          style: {
                            verticalAlign: "middle",
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(episode) - 1
                            }`}
                          style={
                            parseInt(episode) === 1
                              ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                              : {}
                          }
                        >
                          <HiArrowSmLeft />
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}
                    {width > 600 && (
                      <IconContext.Provider
                        value={{
                          size: "1.3rem",
                          style: {
                            verticalAlign: "middle",
                            marginBottom: "0.2rem",
                            marginRight: "0.3rem",
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(episode) - 1
                            }`}
                          style={
                            parseInt(episode) === 1
                              ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                              : {}
                          }
                        >
                          <HiArrowSmLeft />
                          Previous
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}
                    {width <= 600 && (
                      <IconContext.Provider
                        value={{
                          size: "1.8rem",
                          style: {
                            verticalAlign: "middle",
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(episode) + 1
                            }`}
                          style={
                            parseInt(episode) ===
                              parseInt(episodeLinks.totalEpisodes)
                              ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                              : {}
                          }
                        >
                          <HiArrowSmRight />
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}
                    {width > 600 && (
                      <IconContext.Provider
                        value={{
                          size: "1.3rem",
                          style: {
                            verticalAlign: "middle",
                            marginBottom: "0.2rem",
                            marginLeft: "0.3rem",
                          },
                        }}
                      >
                        <EpisodeLinks
                          to={`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(episode) + 1
                            }`}
                          style={
                            parseInt(episode) ===
                              parseInt(episodeLinks.totalEpisodes)
                              ? {
                                pointerEvents: "none",
                                color: "rgba(255,255,255, 0.2)",
                              }
                              : {}
                          }
                        >
                          Next
                          <HiArrowSmRight />
                        </EpisodeLinks>
                      </IconContext.Provider>
                    )}
                  </EpisodeButtons>
                </div>
                <EpisodesWrapper>
                  <p>Episodes</p>
                  <Episodes>
                    {[...Array(parseInt(episodeLinks.totalEpisodes))].map(
                      (x, i) => (
                        <EpisodeLink
                          to={`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(i) + 1
                            }`}
                          style={
                            i + 1 <= parseInt(episode)
                              ? { backgroundColor: "#7676ff" }
                              : {}
                          }
                        >
                          {i + 1}
                        </EpisodeLink>
                      )
                    )}
                  </Episodes>
                </EpisodesWrapper>
              </VideoPlayerWrapper>
            </div>
          )}
        </Wrapper>
      )}
    </div>
  );
}

const VideoPlayerWrapper = styled.div`
  display: grid;
  grid-template-columns: 70% calc(30% - 1rem);
  gap: 1rem;
  align-items: flex-start;
  @media screen and (max-width: 900px) {
    grid-template-columns: auto;
  }
`;

const Conttainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242235;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #393653;
  border-bottom: none;
  margin-top: 1rem;
  font-weight: 400;
  p {
    color: white;
  }

  button {
    outline: none;
    border: none;
    background: transparent;
    margin-left: 1rem;
    cursor: pointer;
  }

  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
  height: 0;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.6);
  background-image: url("https://i.ibb.co/28yS92Z/If-the-video-does-not-load-please-refresh-the-page.png");
  background-size: 23rem;
  background-repeat: no-repeat;
  background-position: center;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  div {
    position: absolute;
    z-index: 10;
    padding: 1rem;
  }

  @media screen and (max-width: 600px) {
    padding-bottom: 66.3%;
    background-size: 13rem;
  }
`;

const EpisodesWrapper = styled.div`
  margin-top: 1rem;
  border: 1px solid #272639;
  border-radius: 0.4rem;
  padding: 1rem;

  p {
    font-size: 1.3rem;
    text-decoration: underline;
    color: white;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  /* box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81); */
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  grid-gap: 0.8rem;
  grid-row-gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  }
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.6rem 0.8rem;
  font-weight: 400;
  border-radius: 0.3rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #7676ff;
  }
`;

const ServerWrapper = styled.div`
  p {
    color: white;
    font-size: 1.4rem;
    font-weight: 400;
    text-decoration: underline;
  }

  .server-wrapper {
    padding: 1rem;
    background-color: #1a1927;
    border: 1px solid #272639;
    border-radius: 0.4rem;
    box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);
  }

  .serverlinks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    grid-gap: 1rem;
    grid-row-gap: 1rem;
    justify-content: space-between;
    margin-top: 1rem;
  }

  button {
    cursor: pointer;
    outline: none;
    color: white;
    background-color: #242235;
    border: 1px solid #393653;
    padding: 0.7rem 1.5rem;
    border-radius: 0.4rem;
    font-weight: 400;
    font-size: 0.9rem;
  }

  @media screen and (max-width: 600px) {
    p {
      font-size: 1.2rem;
    }
  }
`;

const Wrapper = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const EpisodeButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const EpisodeLinks = styled(Link)`
  color: white;
  padding: 0.6rem 1rem;
  background-color: #242235;
  border: 1px solid #393653;
  text-decoration: none;
  font-weight: 400;
  border-radius: 0.4rem;

  @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 50%;
  }
`;

const Titles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 0.5rem;
  p {
    font-size: 1.7rem;
    font-weight: 200;
  }

  span {
    font-weight: 600;
  }

  a {
    font-weight: 400;
    background-color: #242235;
    border: 1px solid #393653;
    text-decoration: none;
    color: white;
    padding: 0.7rem 1.1rem 0.7rem 1.5rem;
    border-radius: 0.4rem;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 1rem;
    p {
      font-size: 1.3rem;
    }
    a {
      padding: 0.7rem;
      border-radius: 50%;
      margin-left: 1rem;
    }
  }
`;

export default WatchAnimeV2;
