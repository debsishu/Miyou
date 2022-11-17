import React, { useEffect, useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BsSkipEnd } from "react-icons/bs";
import { IconContext } from "react-icons";
import styled from "styled-components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Hls from "hls.js";
import plyr from "plyr";
import "plyr/dist/plyr.css";

function VideoPlayer({
  sources,
  internalPlayer,
  setInternalPlayer,
  title,
  type,
}) {
  const { width } = useWindowDimensions();

  let src = sources;
  const [player, setPlayer] = useState(null);

  function skipIntro() {
    player.forward(85);
  }

  useEffect(() => {
    const video = document.getElementById("player");
    let flag = true;

    const defaultOptions = {
      captions: { active: true, update: true, language: "en" },
      controls:
        width > 600
          ? [
              "play-large",
              "rewind",
              "play",
              "fast-forward",
              "progress",
              "current-time",
              "duration",
              "mute",
              "volume",
              "settings",
              "fullscreen",
            ]
          : [
              "play-large",
              "rewind",
              "play",
              "fast-forward",
              "progress",
              "current-time",
              "duration",
              "settings",
              "fullscreen",
            ],
    };

    if (type === "mp4") {
      video.removeAttribute("crossorigin");
      const player = new plyr(video, defaultOptions);
      player.source = {
        type: "video",
        title: "Example title",
        sources: [
          {
            src: src,
            type: "video/mp4",
          },
        ],
      };
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const availableQualities = hls.levels.map((l) => l.height);
        availableQualities.unshift(0);
        defaultOptions.quality = {
          default: 0,
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          var span = document.querySelector(
            ".plyr__menu__container [data-plyr='quality'][value='0'] span"
          );
          if (hls.autoLevelEnabled) {
            span.innerHTML = `Auto (${hls.levels[data.level].height}p)`;
          } else {
            span.innerHTML = `Auto`;
          }
        });
        let player = new plyr(video, defaultOptions);
        setPlayer(new plyr(video, defaultOptions));
        let plyer;
        var button = document.createElement("button");
        button.classList.add("skip-button");
        button.innerHTML = "Skip Intro";
        button.addEventListener("click", function () {
          player.forward(85);
        });
        player.on("ready", () => {
          plyer = document.querySelector(".plyr__controls");
        });

        player.on("enterfullscreen", (event) => {
          plyer.appendChild(button);
          window.screen.orientation.lock("landscape");
        });

        player.on("exitfullscreen", (event) => {
          document.querySelector(".skip-button").remove();
          window.screen.orientation.lock("portrait");
        });

        player.on("timeupdate", function (e) {
          var time = player.currentTime,
            lastTime = localStorage.getItem(title);
          if (time > lastTime) {
            localStorage.setItem(title, Math.round(player.currentTime));
          }
          if (player.ended) {
            localStorage.removeItem(title);
          }
        });

        player.on("play", function (e) {
          if (flag) {
            var lastTime = localStorage.getItem(title);
            if (lastTime !== null && lastTime > player.currentTime) {
              player.forward(parseInt(lastTime));
            }
            flag = false;
          }
        });

        player.on("seeking", (event) => {
          localStorage.setItem(title, Math.round(player.currentTime));
        });
      });
      hls.attachMedia(video);
      window.hls = hls;

      function updateQuality(newQuality) {
        if (newQuality === 0) {
          window.hls.currentLevel = -1;
          console.log("Auto quality selection");
        } else {
          window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              console.log("Found quality match with " + newQuality);
              window.hls.currentLevel = levelIndex;
            }
          });
        }
      }
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      const defaultOptions = {
        captions: { active: true, update: true, language: "en" },
        controls: [
          "play-large",
          "rewind",
          "play",
          "fast-forward",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
      };
      let player = new plyr(video, defaultOptions);
      setPlayer(new plyr(video, defaultOptions));
      let plyer;
      var button = document.createElement("button");
      button.classList.add("skip-button");
      button.innerHTML = "Skip Intro";
      button.addEventListener("click", function () {
        player.forward(85);
      });
      player.on("ready", () => {
        plyer = document.querySelector(".plyr__controls");
      });

      player.on("enterfullscreen", (event) => {
        plyer.appendChild(button);
        window.screen.orientation.lock("landscape");
      });

      player.on("exitfullscreen", (event) => {
        document.querySelector(".skip-button").remove();
        window.screen.orientation.lock("portrait");
      });

      player.on("timeupdate", function (e) {
        var time = player.currentTime,
          lastTime = localStorage.getItem(title);
        if (time > lastTime) {
          localStorage.setItem(title, Math.round(player.currentTime));
        }
        if (player.ended) {
          localStorage.removeItem(title);
        }
      });

      player.on("play", function (e) {
        if (flag) {
          var lastTime = localStorage.getItem(title);
          if (lastTime !== null && lastTime > player.currentTime) {
            player.forward(parseInt(lastTime));
          }
          flag = false;
        }
      });

      player.on("seeking", (event) => {
        localStorage.setItem(title, Math.round(player.currentTime));
      });
    } else {
      const player = new plyr(video, defaultOptions);
      player.source = {
        type: "video",
        title: "Example title",
        sources: [
          {
            src: src,
            type: "video/mp4",
          },
        ],
      };
    }
  }, []);

  return (
    <div
      style={{
        marginBottom: "1rem",
        fontFamily: '"Gilroy-Medium", sans-serif',
        "--plyr-color-main": "#7676FF",
      }}
    >
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
          {internalPlayer && <p>Internal Player</p>}
          <div>
            <div className="tooltip">
              <button onClick={() => setInternalPlayer(!internalPlayer)}>
                <HiOutlineSwitchHorizontal />
              </button>
              <span className="tooltiptext">Change Server</span>
            </div>
            <div className="tooltip">
              <button onClick={() => skipIntro()}>
                <BsSkipEnd />
              </button>
              <span className="tooltiptext">Skip Intro</span>
            </div>
          </div>
        </IconContext.Provider>
      </Conttainer>
      <video id="player" playsInline crossorigin="anonymous"></video>
    </div>
  );
}

const Conttainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242235;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #393653;
  margin-top: 1rem;
  border-bottom: none;
  font-family: "Gilroy-Medium", sans-serif;
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

export default VideoPlayer;
