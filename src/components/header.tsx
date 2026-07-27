import "../styles/header.css";
import logoFilme from "../assets/logoFime.png";
import { useState } from "react";

export default function Header() {
  const [texto, setText] = useState("");

  return (
    <>
      <div className="header-container">
        <div className="header-img">
          <img src={logoFilme} />
        </div>
        <div className="header-tools">
          <input
            type="text"
            value={texto}
            onChange={(e) => setText(e.target.value)}
          ></input>
          {texto === "" && (
            <svg
              className="search-icon"
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.6693 26.6987L36.5 36.5M30.8333 16.6667C30.8333 24.4906 24.4906 30.8333 16.6667 30.8333C8.84262 30.8333 2.5 24.4906 2.5 16.6667C2.5 8.84262 8.84262 2.5 16.6667 2.5C24.4906 2.5 30.8333 8.84262 30.8333 16.6667Z"
                stroke="black"
                stroke-opacity="0.62"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
          <svg
            className="profile-icon"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 30C35.525 30 40 25.525 40 20C40 14.475 35.525 10 30 10C24.475 10 20 14.475 20 20C20 25.525 24.475 30 30 30ZM30 35C23.325 35 10 38.35 10 45V50H50V45C50 38.35 36.675 35 30 35Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
