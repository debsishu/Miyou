import React, { useEffect } from "react";

import Hls from "hls.js";
import plyr from "plyr";
import "plyr/dist/plyr.css";

function VideoPlayer({ sources }) {
  const src = sources.sources[0].file;
  useEffect(() => {
    const video = document.getElementById("player");

    const defaultOptions = {
      captions: { active: true, update: true, language: "en" },
    };

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
        player.on("enterfullscreen", (event) => {
          window.screen.orientation.lock("landscape");
        });

        player.on("exitfullscreen", (event) => {
          window.screen.orientation.lock("portrait");
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
    } else {
      const player = new plyr(src, defaultOptions);
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
      <video id="player" playsInline></video>
    </div>
  );
}

export default VideoPlayer;
