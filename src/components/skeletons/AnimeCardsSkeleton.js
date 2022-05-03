import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import Skeleton from "react-loading-skeleton";

import "swiper/css";
import "swiper/css/scrollbar";

function AnimeCardsSkeleton() {
  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      <Swiper
        slidesPerView={7}
        spaceBetween={35}
        scrollbar={{
          hide: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 3,
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
        {[...Array(8)].map((x, i) => (
          <SwiperSlide>
            <Skeleton
              width={"160px"}
              height={"235px"}
              borderRadius={"0.5rem"}
              baseColor={"#262539"}
              highlightColor={"#34324D"}
            />
            <Skeleton
              width={"160px"}
              baseColor={"#262539"}
              highlightColor={"#34324D"}
              style={{
                marginTop: "1rem",
              }}
            />
            <Skeleton
              width={"160px"}
              baseColor={"#262539"}
              highlightColor={"#34324D"}
              style={{
                marginTop: "1rem",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AnimeCardsSkeleton;
