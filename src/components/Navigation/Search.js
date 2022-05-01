import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { IconContext } from "react-icons";

function Search({ isActive, setIsActive }) {
  const [title, setTitle] = useState("");
  console.log(isActive);
  return (
    <Wrapper>
      <CloseButton>
        <IconContext.Provider
          value={{
            size: "1.5rem",
            color: "white",
            style: {
              verticalAlign: "middle",
              marginBottom: "0.1rem",
              marginRight: "0.3rem",
            },
          }}
        >
          <button onClick={(e) => setIsActive(false)}>
            <CgClose />
          </button>
        </IconContext.Provider>
      </CloseButton>
      <Content>
        <div className="main">
          <IconContext.Provider
            value={{
              size: "1.5rem",
              color: "#C5C5C5",
              style: {
                verticalAlign: "middle",
                marginBottom: "0.1rem",
                marginRight: "0.3rem",
              },
            }}
          >
            <FiSearch />
          </IconContext.Provider>

          <input
            type="text"
            required
            placeholder={"Enter the name of the anime"}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <SearchButton
            to={"/search/" + title}
            onClick={(e) => {
              setIsActive(false);
            }}
          >
            Search
          </SearchButton>
        </div>
      </Content>
    </Wrapper>
  );
}

const Content = styled.div`
  background-color: #1a1927;
  padding: 0rem 4rem 3.8rem 4rem;
  border-radius: 0.5rem;

  .main {
    background-color: white;
    padding: 0.5rem;
    padding-left: 1.2rem;
    padding-right: 0.8rem;
    border-radius: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  input {
    outline: none;
    border: none;
    padding: 1rem 2rem 1rem 0.5rem;
    font-size: 1.1rem;
    font-family: "Gilroy-Medium", sans-serif;
    width: 100%;
  }
  ::placeholder {
    color: #c5c5c5;
  }
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    background-color: transparent;
    outline: none;
    border: none;
    padding: 1rem;
    cursor: pointer;
  }
`;

const SearchButton = styled(Link)`
  background-color: #7676ff;
  color: white;
  padding: 0.9rem 2rem;
  text-decoration: none;
  border-radius: 0.3rem;
  font-family: "Gilroy-Bold", sans-serif;
`;

const Wrapper = styled.div`
  background-color: #1a1927;
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  border: 1px solid #35334e;
  border-radius: 0.5rem;
`;

export default Search;
