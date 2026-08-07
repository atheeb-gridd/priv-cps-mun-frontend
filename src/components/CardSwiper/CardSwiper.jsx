import React, { useState } from "react";
import "./CardSwiper.css"; 

const CardSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const groups = [0, 1, 2]; 

  const handleLoveClick = () => {
    const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(nextIndex);
  };

  const handleHateClick = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;
    setActiveIndex(nextIndex);
  };

  return (
    <div className="card-swiper">
      <div className="card-groups">
        {groups.map((groupIndex) => (
          <div
            key={groupIndex}
            className="card-group"
            data-index={groupIndex}
            data-status={
              activeIndex === groupIndex
                ? "active"
                : groupIndex < activeIndex
                ? "before"
                : "after"
            }
          >
            <div className="little-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")` }}></div>
            <div className="big-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60n")` }}></div>
            <div className="little-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1548546738-8509cb246ed3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60")` }}></div>
            <div className="big-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")` }}></div>
            <div className="little-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")` }}></div>
            <div className="big-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")` }}></div>
            <div className="little-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGNhdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")` }}></div>
            <div className="big-card card" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGRvZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")` }}></div>
          </div>
        ))}
      </div>
      <div className="card-swiper-buttons">
        <button id="hate-button" onClick={handleHateClick}>
          <i className="fa-solid fa-x"></i>
        </button>
        <button id="love-button" onClick={handleLoveClick}>
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>
      <a
        id="source-link"
        className="meta-link"
        href="https://kippo.com/chill"
        target="_blank"
      >
        <i className="fa-solid fa-link"></i>
        <span>Source</span>
      </a>
      <a
        id="yt-link"
        className="meta-link"
        href="https://youtu.be/6TYkDy54q4E"
        target="_blank"
      >
        <i className="fa-brands fa-youtube"></i>
        <span>Tutorial</span>
      </a>
    </div>
  );
};

export default CardSwiper;
