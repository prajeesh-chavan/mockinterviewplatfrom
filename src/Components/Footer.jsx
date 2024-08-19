import React from 'react';
import './footer.css'; // Import the CSS file

const Footer = () => {
  // Generate bubble styles dynamically
  const generateBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 128; i++) {
      const size = 2 + Math.random() * 4;
      const distance = 6 + Math.random() * 4;
      const position = -5 + Math.random() * 110;
      const time = 2 + Math.random() * 2;
      const delay = -1 * (2 + Math.random() * 2);
      bubbles.push(
        <div
          key={i}
          className="bubble"
          style={{
            '--size': `${size}rem`,
            '--distance': `${distance}rem`,
            '--position': `${position}%`,
            '--time': `${time}s`,
            '--delay': `${delay}s`
          }}
        />
      );
    }
    return bubbles;
  };

  return (
    <div className='main'>
    <div className="footer">
      <div className="bubbles">
        {generateBubbles()}
      </div>
      <div className="content">
        <div>
          
        </div>
        <div>
          <a
            className="image"
            
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/happy.svg")' }}
          />
          <p>©2024 Prajeesh Chavan</p>
        </div>
      </div>
      <svg style={{ position: 'fixed', top: '100vh' }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </div>
    </div>
  );
};

export default Footer;
