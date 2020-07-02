import React from 'react';
import {
  Link
} from "react-router-dom";

import Button from '../components/Button';
import colours from '../utils/colours';

const MainPage = () => {
  return (
    <div className="container container-slim text-center">
      <h1>C O D E N A M E S</h1>
      <div>
        <img src="/cityscapes-downtown.svg" />
      </div>

      <div>
        <Link to="/create-room">
          <Button type="yellowOrange">
            Create a Room
          </Button>
        </Link>
        <span style={{padding: 5}}></span>
        <Link to="/join-room">
          <Button type="neutral">
            Enter a Room
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
