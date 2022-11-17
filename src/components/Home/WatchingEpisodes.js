import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import AnimeCardsSkeleton from "../skeletons/AnimeCardsSkeleton";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { searchWatchedId } from "../../hooks/searchQueryStrings";

import "swiper/css";
import "swiper/css/scrollbar";

function WatchingEpisodes() {
  const [data, setData] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);

  useEffect(() => {
    getAnimeData();
  }, []);

  async function getAnimeData() {
    setLoading(true);
    let data = localStorage.getItem("Watching");
    data = JSON.parse(data);
    setLocalData(data);
    let ids = [];
    for (let i = 0; i < data.length; i++) {
      ids.push(data[i].malId);
    }
    let result = await axios({
      url: process.env.REACT_APP_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchWatchedId,
        variables: {
          ids,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    let output = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < result.data.data.Page.media.length; j++) {
        if (
          parseInt(result.data.data.Page.media[j].idMal) ===
          parseInt(data[i].malId)
        ) {
          output.push(result.data.data.Page.media[j]);
        }
      }
    }
    setData(output);
    setLoading(false);
  }

  function removeAnime(index) {
    let lsData = localStorage.getItem("Watching");
    lsData = JSON.parse(lsData);
    lsData.splice(index, 1);
    lsData = JSON.stringify(lsData);
    localStorage.setItem("Watching", lsData);
    data.splice(index, 1);
    setChange(!change);
  }

  return (
    <div>
      {loading && <AnimeCardsSkeleton />}
      {!loading && (
        <Swiper
          slidesPerView={7}
          spaceBetween={35}
          scrollbar={{
            hide: false,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            "@0.75": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 4,
              spaceBetween: 35,
            },
            "@1.30": {
              slidesPerView: 5,
              spaceBetween: 35,
            },
            "@1.50": {
              slidesPerView: 7,
              spaceBetween: 35,
            },
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {data.map((item, i) => (
            <SwiperSlide>
              <Wrapper>
                <IconContext.Provider
                  value={{
                    size: "1.2rem",
                    color: "white",
                    style: {
                      verticalAlign: "middle",
                    },
                  }}
                >
                  <button
                    className="closeButton"
                    onClick={() => {
                      removeAnime(i);
                    }}
                  >
                    <IoClose />
                  </button>
                </IconContext.Provider>

                <Link
                  to={`play/${localData[i].animeId}/${localData[i].episode}`}
                >
                  <img src={item.coverImage.extraLarge} alt="" />
                </Link>
                <p>
                  {item.title.userPreferred}
                  {localData[i].isDub ? " (Dub)" : " (Sub)"}
                </p>
                <p className="episodeNumber">
                  {"Episode - " + localData[i].episode}
                </p>
              </Wrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

const Wrapper = styled.div`
  position: relative;

  .closeButton {
    position: absolute;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0.5rem 0 0.2rem 0;
  }
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
    }
    @media screen and (max-width: 400px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
    @media screen and (max-width: 600px) {
      max-width: 120px;
    }
    @media screen and (max-width: 400px) {
      max-width: 100px;
    }
  }

  .episodeNumber {
    font-family: "Gilroy-Regular", sans-serif;
    color: #b5c3de;
  }
`;

export default WatchingEpisodes;
