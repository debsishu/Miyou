import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import AnimeCardsSkeleton from "../skeletons/AnimeCardsSkeleton";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

import "swiper/css";
import "swiper/css/scrollbar";

const anilistUrl = "https://graphql.anilist.co";
let searchAnimeQuery = `
	query($search: String) {
		Media (search : $search, type: ANIME) {
			title {
				romaji
				english
				userPreferred
			}
			bannerImage
			coverImage{
				extraLarge
				large
			}
		}
	}
`;

function WatchingEpisodes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);

  useEffect(() => {
    getData();
  }, [change]);

  async function getData() {
    setLoading(true);
    let lsData = localStorage.getItem("Animes");
    lsData = JSON.parse(lsData);
    let apiRes = [];

    for (let i = 0; i < lsData.Names.length; i++) {
      let name = lsData.Names[i].name;
      let anilistResponse;
      try {
        anilistResponse = await axios({
          url: anilistUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            query: searchAnimeQuery,
            variables: {
              search: name.replace(" (Dub)", "").replace(" (TV)", ""),
            },
          },
        });
      } catch (err) {
        console.log("Error from getanime anilist api call", err);
        apiRes.push({
          name,
          coverImage: "https://i.ibb.co/RYhg4tH/banner-not-found.jpg",
          link: lsData.Names[i].episodeLink,
          episodeNum: lsData.Names[i].currentEpisode,
          index: i,
        });
        continue;
      }
      apiRes.push({
        name,
        coverImage: anilistResponse.data.data.Media.coverImage.extraLarge,
        link: lsData.Names[i].episodeLink,
        episodeNum: lsData.Names[i].currentEpisode,
        index: i,
      });
    }
    setData(apiRes);
    setLoading(false);
  }

  function removeAnime(index) {
    let lsData = localStorage.getItem("Animes");
    lsData = JSON.parse(lsData);
    lsData.Names.splice(index, 1);
    lsData = JSON.stringify(lsData);
    localStorage.setItem("Animes", lsData);
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

                <Link to={"watch/" + item.link}>
                  <img src={item.coverImage} alt="" />
                </Link>
                <p>{item.name}</p>
                <p className="episodeNumber">
                  {"Episode - " + item.episodeNum}
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
