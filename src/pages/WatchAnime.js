import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { BiArrowToBottom } from "react-icons/bi";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { IconContext } from "react-icons";
import WatchAnimeSkeleton from "../components/skeletons/WatchAnimeSkeleton";

function WatchAnime() {
  let episodeSlug = useParams().episode;

  const [episodeLinks, setEpisodeLinks] = useState([]);
  const [currentServer, setCurrentServer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEpisodeLinks();
  }, [episodeSlug]);

  async function getEpisodeLinks() {
    setLoading(true);
    let res = await axios.get(
      `https://miyou-api.herokuapp.com/api/getlinks?link=/${episodeSlug}`
    );
    setLoading(false);
    setEpisodeLinks(res.data);
    setCurrentServer(res.data[0].vidstreaming);
    window.scrollTo(0, 0);
  }

  return (
    <div>
      {loading && <WatchAnimeSkeleton />}
      {!loading && (
        <Wrapper>
          {episodeLinks.length > 0 && currentServer !== "" && (
            <div>
              <Titles>
                <p>
                  <span>
                    {episodeLinks[0].titleName.substring(
                      0,
                      episodeLinks[0].titleName.indexOf("Episode")
                    )}
                  </span>{" "}
                  -
                  {" " +
                    episodeLinks[0].titleName.substring(
                      episodeLinks[0].titleName.indexOf("Episode")
                    )}
                </p>
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
                    href={episodeLinks[0].downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                    <BiArrowToBottom />
                  </a>
                </IconContext.Provider>
              </Titles>
              <div>
                <IframeWrapper>
                  <iframe
                    title={episodeLinks[0].title}
                    src={currentServer}
                    allowfullscreen="true"
                    frameborder="0"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
                  ></iframe>
                </IframeWrapper>
                <EpisodeButtons>
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
                      to={
                        "/watch" +
                        episodeLinks[0].baseEpisodeLink +
                        (parseInt(
                          episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                        ) -
                          1)
                      }
                      style={
                        episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1") === "1"
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
                      to={
                        "/watch" +
                        episodeLinks[0].baseEpisodeLink +
                        (parseInt(
                          episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                        ) +
                          1)
                      }
                      style={
                        episodeLinks[0].numOfEpisodes ===
                        episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
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
                </EpisodeButtons>
                <ServerWrapper>
                  <div className="server-wrapper">
                    <p>Servers List</p>
                    <div className="serverlinks">
                      {episodeLinks[0].vidstreaming !== null && (
                        <button
                          onClick={() => {
                            setCurrentServer(episodeLinks[0].vidstreaming);
                          }}
                          style={
                            currentServer === episodeLinks[0].vidstreaming
                              ? {
                                  backgroundColor: "#7676ff",
                                }
                              : {}
                          }
                        >
                          VIDSTREAMING
                        </button>
                      )}
                      {episodeLinks[0].streamsb !== null && (
                        <button
                          onClick={() => {
                            setCurrentServer(episodeLinks[0].streamsb);
                          }}
                          style={
                            currentServer === episodeLinks[0].streamsb
                              ? {
                                  backgroundColor: "#7676ff",
                                }
                              : {}
                          }
                        >
                          STREAMSB
                        </button>
                      )}
                      {episodeLinks[0].gogoserver !== null && (
                        <button
                          onClick={() => {
                            setCurrentServer(episodeLinks[0].gogoserver);
                          }}
                          style={
                            currentServer === episodeLinks[0].gogoserver
                              ? {
                                  backgroundColor: "#7676ff",
                                }
                              : {}
                          }
                        >
                          GOGOSERVER
                        </button>
                      )}
                      {episodeLinks[0].xstreamcdn !== null && (
                        <button
                          onClick={() => {
                            setCurrentServer(episodeLinks[0].xstreamcdn);
                          }}
                          style={
                            currentServer === episodeLinks[0].xstreamcdn
                              ? {
                                  backgroundColor: "#7676ff",
                                }
                              : {}
                          }
                        >
                          XSTREAMCDN
                        </button>
                      )}
                      {episodeLinks[0].mixdrop !== null && (
                        <button
                          onClick={() => {
                            setCurrentServer(episodeLinks[0].mixdrop);
                          }}
                          style={
                            currentServer === episodeLinks[0].mixdrop
                              ? {
                                  backgroundColor: "#7676ff",
                                }
                              : {}
                          }
                        >
                          MIXDROP
                        </button>
                      )}
                      {episodeLinks[0].mp4upload !== null && (
                        <button
                          onClick={() => {
                            setCurrentServer(episodeLinks[0].mp4upload);
                          }}
                          style={
                            currentServer === episodeLinks[0].mp4upload
                              ? {
                                  backgroundColor: "#7676ff",
                                }
                              : {}
                          }
                        >
                          MP4UPLOAD
                        </button>
                      )}
                      {episodeLinks[0].doodstream !== null && (
                        <button
                          onClick={() => {
                            setCurrentServer(episodeLinks[0].doodstream);
                          }}
                          style={
                            currentServer === episodeLinks[0].doodstream
                              ? {
                                  backgroundColor: "#7676ff",
                                }
                              : {}
                          }
                        >
                          DOODSTREAM
                        </button>
                      )}
                    </div>
                  </div>
                </ServerWrapper>
                <EpisodesWrapper>
                  <p>Episodes</p>
                  <Episodes>
                    {episodeLinks[0].episodes.map((item, i) => (
                      <EpisodeLink
                        to={"/watch" + item}
                        style={
                          parseInt(
                            episodeSlug.replace(/.*?(\d+)[^\d]*$/, "$1")
                          ) ===
                          i + 1
                            ? { backgroundColor: "#7676ff" }
                            : {}
                        }
                      >
                        Episode {i + 1}
                      </EpisodeLink>
                    ))}
                  </Episodes>
                </EpisodesWrapper>
              </div>
            </div>
          )}
        </Wrapper>
      )}
    </div>
  );
}

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
  height: 0;
  overflow: hidden;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.6);
  background-image: url("https://i.ibb.co/28yS92Z/If-the-video-does-not-load-please-refresh-the-page.png");
  background-repeat: no-repeat;
  background-position: center;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    font-family: "Gilroy-Medium", sans-serif;
    margin-bottom: 1rem;
  }
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: space-between;
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.9rem 2rem;
  font-family: "Gilroy-Medium", sans-serif;
  border-radius: 0.4rem;
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
    font-family: "Gilroy-Medium", sans-serif;
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
    font-family: "Gilroy-Medium", sans-serif;
    font-size: 0.9rem;
  }
`;

const Wrapper = styled.div`
  margin: 2rem 5rem 2rem 5rem;
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
  font-family: "Gilroy-Medium", sans-serif;
  border-radius: 0.4rem;
`;

const Titles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 0.5rem;
  p {
    font-size: 1.7rem;
    font-family: "Gilroy-Light", sans-serif;
  }

  span {
    font-family: "Gilroy-Bold", sans-serif;
  }

  a {
    font-family: "Gilroy-Medium", sans-serif;
    background-color: #242235;
    border: 1px solid #393653;
    text-decoration: none;
    color: white;
    padding: 0.7rem 1.1rem 0.7rem 1.5rem;
    border-radius: 0.4rem;
  }
`;

export default WatchAnime;
