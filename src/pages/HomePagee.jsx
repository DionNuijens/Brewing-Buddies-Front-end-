import React from 'react';

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to BrewingBuddies</h1>
      </header>
      <main>
        <p>Thank you for visiting! We're excited to have you here.</p>
        <p>Explore our features and enjoy your time in here!</p>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} BrewingBuddies</p>
      </footer>
    </div>
  );
};

export default HomePage;
