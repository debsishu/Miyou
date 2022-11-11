import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function WatchAnimeSkeleton() {
  const { width, height } = useWindowDimensions();

  return (
    <div>
      <Wrapper>
        <div>
          <Skeleton
            height={40}
            baseColor={"#262539"}
            highlightColor={"#34324D"}
            style={{
              marginBottom: "1rem",
            }}
          />
          <Skeleton
            baseColor={"#262539"}
            highlightColor={"#34324D"}
            style={{
              marginBottom: "1rem",
              aspectRatio: width <= 600 ? "16 / 11" : "16 / 9",
            }}
          />
          <Skeleton
            height={40}
            baseColor={"#262539"}
            highlightColor={"#34324D"}
            style={{
              marginBottom: "1rem",
            }}
          />
        </div>
        <EpisodesWrapper>
          <p>Episodes</p>
          <Episodes>
            {[...Array(20)].map((x, i) => (
              <div>
                <Skeleton
                  width={"3rem"}
                  height={45}
                  borderRadius={"0.4rem"}
                  baseColor={"#262539"}
                  highlightColor={"#34324D"}
                />
              </div>
            ))}
          </Episodes>
        </EpisodesWrapper>
      </Wrapper>
    </div>
  );
}

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  grid-gap: 0.8rem;
  grid-row-gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
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

const Wrapper = styled.div`
  margin: 0.5rem 5rem 2rem 5rem;
  display: grid;
  grid-template-columns: 70% calc(30% - 1rem);
  gap: 1rem;
  align-items: flex-start;
  @media screen and (max-width: 900px) {
    grid-template-columns: auto;
  }
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

export default WatchAnimeSkeleton;
