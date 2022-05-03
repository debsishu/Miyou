import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

function WatchAnimeSkeleton() {
  return (
    <div>
      <Wrapper>
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
            aspectRatio: "16 / 9",
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
        <EpisodesWrapper>
          <p>Servers List</p>
          <Episodes>
            {[...Array(7)].map((x, i) => (
              <div>
                <Skeleton
                  width={"10rem"}
                  height={40}
                  borderRadius={"0.5rem"}
                  baseColor={"#262539"}
                  highlightColor={"#34324D"}
                />
              </div>
            ))}
          </Episodes>
        </EpisodesWrapper>
        <EpisodesWrapper>
          <p>Episodes</p>
          <Episodes>
            {[...Array(20)].map((x, i) => (
              <div>
                <Skeleton
                  width={"10rem"}
                  height={40}
                  borderRadius={"0.5rem"}
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
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: space-between;
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
  margin: 2rem 5rem 2rem 5rem;
`;

export default WatchAnimeSkeleton;
