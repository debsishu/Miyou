import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CarouselSkeleton() {
  return (
    <div
      style={{
        marginBottom: "2rem",
      }}
    >
      <Skeleton
        height={"330px"}
        baseColor={"#262539"}
        highlightColor={"#34324D"}
        borderRadius={"0.7rem"}
      />
    </div>
  );
}

export default CarouselSkeleton;
