import React from "react";
import styled from "styled-components";

function ServersList({ episodeLinks, currentServer, setCurrentServer }) {
  return (
    <div>
      <ServerWrapper>
        <div className="server-wrapper">
          <p>Servers List</p>
          <div className="serverlinks">
            {episodeLinks[0].vidstreaming !== undefined && (
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
            {episodeLinks[0].streamsb !== undefined && (
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
            {episodeLinks[0].gogoserver !== undefined && (
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
            {episodeLinks[0].xstreamcdn !== undefined && (
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
            {episodeLinks[0].mixdrop !== undefined && (
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
            {episodeLinks[0].mp4upload !== undefined && (
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
            {episodeLinks[0].doodstream !== undefined && (
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
    </div>
  );
}

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

  @media screen and (max-width: 600px) {
    p {
      font-size: 1.2rem;
    }
  }
`;

export default ServersList;
