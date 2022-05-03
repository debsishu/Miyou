import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

function AnimeDetailsSkeleton() {
  return (
    <Content>
      <Skeleton
        height={"20rem"}
        baseColor={"#262539"}
        highlightColor={"#34324D"}
        style={{
          borderRadius: "0.7rem",
          marginBottom: "2rem",
        }}
      />
      <ContentWrapper>
        <Skeleton
          baseColor={"#262539"}
          highlightColor={"#34324D"}
          count={7}
          style={{
            marginBottom: "1rem",
          }}
        />
      </ContentWrapper>
    </Content>
  );
}

const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
`;

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;
`;

export default AnimeDetailsSkeleton;
