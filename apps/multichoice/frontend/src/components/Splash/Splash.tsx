import React, { useState } from 'react';
import './style.css';

const Splash: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return loading ? (
    <div
      id="splash"
      className="flex h-screen items-center justify-center z-10 w-screen left-0 top-0 bg-primary-800 fixed"
      onAnimationEnd={(e) => {
        if (e.animationName === 'fadeOut') {
          setLoading(false);
        }
      }}
    >
      <svg
        width="424"
        height="152"
        viewBox="0 0 424 152"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M111.405 114.42L111.407 114.415C116.85 103.452 119.5 90.5182 119.5 75.7305C119.5 61.0365 116.874 48.2134 111.474 37.3816C106.074 26.5024 98.2579 18.0922 88.0531 12.2532C77.8374 6.36287 65.684 3.5 51.7388 3.5H10C6.41015 3.5 3.5 6.41015 3.5 10V142C3.5 145.59 6.41015 148.5 10 148.5H49.8408C64.3931 148.5 76.9904 145.648 87.4795 139.765L87.4901 139.759C97.9619 133.838 105.948 125.363 111.405 114.42ZM91.0522 48.4014L91.0552 48.4081C94.4617 55.8913 96.2313 64.9637 96.2313 75.7305C96.2313 86.5848 94.4398 95.7471 90.988 103.321C87.5751 110.81 82.4377 116.52 75.5306 120.549C68.6616 124.556 59.8041 126.676 48.7562 126.676H27.3109V25.3242H50.6542C61.0404 25.3242 69.4377 27.41 76.0381 31.363L76.045 31.3671L76.0518 31.3712C82.6783 35.2988 87.6723 40.9353 91.0522 48.4014Z"
          stroke="white"
          strokeWidth="9"
        />
        <path
          d="M148.5 10V18.8242C148.5 22.4141 151.41 25.3242 155 25.3242H192.104V142C192.104 145.59 195.014 148.5 198.604 148.5H209.396C212.986 148.5 215.896 145.59 215.896 142V25.3242H253C256.59 25.3242 259.5 22.4141 259.5 18.8242V10C259.5 6.41015 256.59 3.5 253 3.5H155C151.41 3.5 148.5 6.41015 148.5 10Z"
          stroke="white"
          strokeWidth="9"
        />
        <path
          d="M420.5 142V10C420.5 6.41015 417.59 3.5 414 3.5H403.473C399.883 3.5 396.973 6.41015 396.973 10V106.437L327.021 6.27818C325.805 4.53725 323.816 3.5 321.692 3.5H310C306.41 3.5 303.5 6.41015 303.5 10V142C303.5 145.59 306.41 148.5 310 148.5H320.798C324.388 148.5 327.298 145.59 327.298 142V45.8406L396.978 145.719C398.194 147.462 400.184 148.5 402.309 148.5H414C417.59 148.5 420.5 145.59 420.5 142Z"
          stroke="white"
          strokeWidth="9"
        />
      </svg>
    </div>
  ) : null;
};

export default Splash;
