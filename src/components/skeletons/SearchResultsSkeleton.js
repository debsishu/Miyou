import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

function SearchResultsSkeleton({ name }) {
  return (
    <Parent>
      <Heading>
        <span>{name}</span> Results
      </Heading>
      <CardWrapper>
        {[...Array(40)].map((x, i) => (
          <div>
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
              count={2}
              style={{
                marginTop: "1rem",
              }}
            />
          </div>
        ))}
      </CardWrapper>
    </Parent>
  );
}

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-family: "Gilroy-Light", sans-serif;
  margin-bottom: 2rem;
  span {
    font-family: "Gilroy-Bold", sans-serif;
  }
`;

const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  h2 {
    color: white;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;
`;

export default SearchResultsSkeleton;
