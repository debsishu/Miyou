import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { IconContext } from "react-icons";
import Search from "./Search";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function Nav() {
  const [isActive, setIsActive] = useState(false);
  const { height, width } = useWindowDimensions();

  return (
    <div>
      <NavBar>
        <Link to="/">
          <img src="./assets/logo.svg" alt="Logo Here" />
        </Link>
        <div className="nav-links">
          <Links to="/trending/1">Trending</Links>
          <Links to="/popular/1">Popular</Links>
          <Links to="/favourites/1">Favourites</Links>
          <Links to="/movies">Top Movies</Links>
        </div>

        {width <= 600 && (
          <IconContext.Provider
            value={{
              size: "1.5rem",
              style: {
                verticalAlign: "middle",
                marginBottom: "0.2rem",
                marginRight: "0.3rem",
              },
            }}
          >
            <Button onClick={(e) => setIsActive(!isActive)}>
              <FiSearch />
            </Button>
          </IconContext.Provider>
        )}
        {width > 600 && (
          <IconContext.Provider
            value={{
              size: "1rem",
              style: {
                verticalAlign: "middle",
                marginBottom: "0.2rem",
                marginRight: "0.3rem",
              },
            }}
          >
            <Button onClick={(e) => setIsActive(!isActive)}>
              <FiSearch />
              Search
            </Button>
          </IconContext.Provider>
        )}
      </NavBar>
      {isActive && <Search isActive={isActive} setIsActive={setIsActive} />}
      {isActive && <Shadow></Shadow>}
    </div>
  );
}

const Shadow = styled.div`
  z-index: 9;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 98.6vw;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

const Button = styled.button`
  color: white;
  font-family: "Lexend", sans-serif;
  font-weight: 500;
  background-color: #7676ff;
  outline: none;
  border: none;
  padding: 0.7rem 1.6rem 0.7rem 1.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;
  FiSearch {
    font-size: 1rem;
  }
  white-space: nowrap;
  @media screen and (max-width: 600px) {
    padding: 0.5rem;
    padding-right: 0;
    background-color: transparent;
  }
`;

const Links = styled(Link)`
  color: white;
  font-weight: 400;
  text-decoration: none;
  margin: 0rem 1.3rem 0 1.3rem;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.8rem 5rem 0 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 2rem;
    margin-top: 1rem;
    img {
      height: 1.7rem;
    }
    .nav-links {
      display: none;
    }
  }
`;

export default Nav;
