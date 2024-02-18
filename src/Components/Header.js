import React from 'react';
const Header = () => {
    return (
        <header style={{ backgroundColor: '#282c34', padding: '0.1px', color: 'white', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="./Logo.png" alt="Logo" style={{ width: '130px', marginRight: '40px' }} />
          
          <h1 style={{ fontFamily: 'Bold', fontSize: '2em', fontWeight: 'bold', margin: 0, color: 'red' }}>FilmHub</h1>
        </header>
      );
    };

export default Header;
