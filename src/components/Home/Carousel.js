import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { BsFillPlayFill } from "react-icons/bs";
import { IconContext } from "react-icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Carousel({ images }) {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ dynamicBullets: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {images.map(
          (item, index) =>
            item.bannerImage !== null && (
              <SwiperSlide>
                <Container>
                  <img src={item.bannerImage} alt="" style={bannerImgStyle} />
                  <Wrapper>
                    <Content>
                      <p>
                        {item.title.english !== null
                          ? item.title.english
                          : item.title.romaji}
                      </p>
                      <IconContext.Provider
                        value={{
                          size: "1.15rem",
                          style: {
                            verticalAlign: "middle",
                            marginBottom: "0.1rem",
                            marginRight: "0.3rem",
                          },
                        }}
                      >
                        <Button to={"search/" + item.title.romaji}>
                          <BsFillPlayFill />
                          Watch Now
                        </Button>
                      </IconContext.Provider>
                    </Content>
                  </Wrapper>
                </Container>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
}

const bannerImgStyle = {
  width: "100%",
  height: "330px",
  objectFit: "cover",
  borderRadius: "0.7rem",
};

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(27, 26, 39, 0) 0%,
    rgba(38, 36, 65, 0.3) 30%,
    rgba(0, 0, 0, 0.9) 100%
  );
  background-blend-mode: multiply;
  border-radius: 0.7rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin: 6rem 2.3rem 0 2.3rem;

  p {
    font-family: "Gilroy-Bold", sans-serif;
    font-size: 1.6rem;
  }
`;

const Button = styled(Link)`
  color: white;
  font-family: "Gilroy-Bold", sans-serif;
  text-decoration: none;
  background-color: #7676ff;
  outline: none;
  border: none;
  padding: 0.75rem 1.3rem 0.75rem 1.3rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
`;

export default Carousel;
