import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { IconContext } from "react-icons";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function Search({ isActive, setIsActive }) {
  const [title, setTitle] = useState("");
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();

  function searchEnter() {
    if (title !== "") {
      setIsActive(false);
      navigate("/search/" + title);
    }
  }

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
          <div>
            {width <= 600 && (
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
            )}
            {width > 600 && (
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
            )}

            <input
              type="text"
              required
              placeholder={"Enter the name of the anime"}
              value={title}
              autoFocus
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  searchEnter();
                }
              }}
            />
          </div>
          {title !== "" && (
            <SearchButton
              to={"/search/" + title}
              onClick={(e) => {
                setIsActive(false);
              }}
            >
              Search
            </SearchButton>
          )}
          {title === "" && <button>Search</button>}
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
  div {
    display: flex;
    align-items: center;
    width: 100%;
  }
  input {
    outline: none;
    border: none;
    padding: 1rem 2rem 1rem 0.5rem;
    font-size: 1.1rem;
    font-family: "Gilroy-Medium", sans-serif;
    width: 100%;
    background-color: white;
    color: black;
  }
  ::placeholder {
    color: #c5c5c5;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;

    .main {
      flex-direction: column;
      background-color: transparent;
      padding: 0;
      padding-left: 0;
      padding-right: 0;
    }

    div {
      background-color: white;
      padding: 0.3rem 1rem;
      border-radius: 0.3rem;
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  button {
    outline: none;
    border: none;
    background-color: #7676ff;
    color: white;
    font-size: 1rem;
    padding: 0.9rem 2rem;
    text-decoration: none;
    border-radius: 0.3rem;
    text-align: center;
    font-family: "Gilroy-Bold", sans-serif;
    cursor: pointer;

    @media screen and (max-width: 600px) {
      display: block;
      width: 100%;
      font-size: 1.2rem;
    }
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
  text-align: center;
  font-family: "Gilroy-Bold", sans-serif;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    font-size: 1.2rem;
  }
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

  @media screen and (max-width: 600px) {
    width: 93%;
  }
`;

export default Search;
