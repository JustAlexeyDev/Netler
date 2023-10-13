// // Import Icons
// import HomeIcon from '../Assets/Icons/homeIcon.svg';
// import FriendsIcon from '../Assets/Icons/friendsIcon.svg';
// import AddPost from '../Assets/Icons/addPostIcon.svg';
// import notificationIcon from '../Assets/Icons/notificationIcon.svg';
// // Import React Libs
// import { Link } from 'react-router-dom';

const Footer = () => {
  // resources in description
  const mainTabs = document.querySelector(".main-tabs");
  const mainSliderCircle = document.querySelector(".main-slider-circle");
  const roundButtons = document.querySelectorAll(".round-button");

  const colors = {
    blue: {
      50: {
        value: "#e3f2fd"
      },
      100: {
        value: "#bbdefb"
      }
    },
    green: {
      50: {
        value: "#e8f5e9"
      },
      100: {
        value: "#c8e6c9"
      }
    },
    purple: {
      50: {
        value: "#f3e5f5"
      },
      100: {
        value: "#e1bee7"
      }
    },
    orange: {
      50: {
        value: "#ffe0b2"
      },
      100: {
        value: "#ffe0b2"
      }
    },
    red: {
      50: {
        value: "#ffebee"
      },
      100: {
        value: "#ffcdd2"
      }
    }
  };

  const getColor = (color, variant) => {
    return colors[color][variant].value;
  };

  const handleActiveTab = (tabs, event, className) => {
    tabs.forEach((tab) => {
      tab.classList.remove(className);
    });

    if (!event.target.classList.contains(className)) {
      event.target.classList.add(className);
    }
  };

  mainTabs.addEventListener("click", (event) => {
    const root = document.documentElement;
    const targetColor = event.target.dataset.color;
    const targetTranslateValue = event.target.dataset.translateValue;

    if (event.target.classList.contains("round-button")) {
      mainSliderCircle.classList.remove("animate-jello");
      void mainSliderCircle.offsetWidth;
      mainSliderCircle.classList.add("animate-jello");

      root.style.setProperty("--translate-main-slider", targetTranslateValue);
      root.style.setProperty("--main-slider-color", getColor(targetColor, 50));
      root.style.setProperty("--background-color", getColor(targetColor, 100));

      handleActiveTab(roundButtons, event, "active");

      if (!event.target.classList.contains("gallery")) {
        root.style.setProperty("--filters-container-height", "0");
        root.style.setProperty("--filters-wrapper-opacity", "0");
      } else {
        root.style.setProperty("--filters-container-height", "3.8rem");
        root.style.setProperty("--filters-wrapper-opacity", "1");
      }
    }
  });

  const filterTabs = document.querySelector(".filter-tabs");
  const filterButtons = document.querySelectorAll(".filter-button");

  filterTabs.addEventListener("click", (event) => {
    const root = document.documentElement;
    const targetTranslateValue = event.target.dataset.translateValue;

    if (event.target.classList.contains("filter-button")) {
      root.style.setProperty("--translate-filters-slider", targetTranslateValue);
      handleActiveTab(filterButtons, event, "filter-active");
    }
  });

  return(
    <div className="Footer_Container">
      <nav className="amazing-tabs">
          <div className="filters-container">
            <div className="filters-wrapper">
              <ul className="filter-tabs">
                <li>
                  <button className="filter-button filter-active" data-translate-value="0">
                    New
                  </button>
                </li>
                <li>
                  <button className="filter-button" data-translate-value="100%">
                    Popular
                  </button>
                </li>
                <li>
                  <button className="filter-button" data-translate-value="200%">
                    Following
                  </button>
                </li>
              </ul>
              <div className="filter-slider" aria-hidden="true">
                <div className="filter-slider-rect"></div>
              </div>
            </div>
          </div>
          <div className="main-tabs-container">
            <div className="main-tabs-wrapper">
              <ul className="main-tabs">
                <li>
                  <button className="round-button" data-translate-value="0" data-color="red">
                    <span className="avatar">
                     Avatar
                    </span>
                  </button>
                </li>
                <li>
                  <button className="round-button gallery active" data-translate-value="100%" data-color="blue">
                    1
                  </button>
                </li>
                <li>
                  <button className="round-button #00c853" data-translate-value="200%" data-color="green">

                  </button>
                </li>
                <li>
                  <button className="round-button" data-translate-value="300%" data-color="purple">
                    2
                  </button>
                </li>
                <li>
                  <button className="round-button" data-translate-value="400%" data-color="orange">
                    3
                  </button>
                </li>
              </ul>
              <div className="main-slider" aria-hidden="true">
                <div className="main-slider-circle"></div>
              </div>
            </div>
          </div>
        </nav>      
      </div>
  );
}
export default Footer