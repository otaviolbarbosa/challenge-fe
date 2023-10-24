import React, { ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import { useSearchContext } from 'context/SearchContext';
import logo from '../assets/logo.png';

function SearchBar({ ...props }) {
  const { searchTerm, setSearchTerm} = useSearchContext();
  const navigate = useNavigate();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handleSubmit= (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/items?search=${searchTerm}`);
  }
  return (
    <div {...props}>
      <div className="limiter">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Meli logo" />
          </Link>
        </div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input type="text" value={searchTerm} onChange={handleChangeSearch} />
          <button type="submit"><GoSearch /></button>
        </form>

      </div>
    </div>
  )
}

export default styled(SearchBar)`
  background-color: #fff159;

  width: 100%;
  padding: 0.625rem;

  .limiter {
    display: flex;

    .logo {
      width: 162px;
      margin-right: 24px;
      display: flex;
      align-items: center;
  
      img {
        height: 34px;
        width: 134px;
      }
    }

    .search-form {
      display: flex;
      flex: 1;
      height: 40px;
      background-color: #fff;
      border-radius: 0.125rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);

      input {
        flex: 1;
        border: none;
        border-radius: 0.125rem;
        padding: 10px 15px;
        outline: none;
      }

      button {
        position: relative;
        border: none;
        background-color: transparent;
        padding: 10px 14px;
        font-size: 1.25rem;

        &:before {
          content: "";
          position: absolute;
          display: block;
          height: 26px;
          border-left: 1px solid #e6e6e6;
          top: 6.5px;
          left: 0;
        }
      }
    }
  }
`;