import React from 'react';
import {
  Link
} from "react-router-dom";

import Button from '../components/Button';
import TitleHeader from '../components/TitleHeader';

const MainPage = () => {
  return (
    <div className="container container-slim text-center">
      <TitleHeader />
      <div>
        <img width="336" height="227" alt="cityscapes downtown" src="/cityscapes-downtown.svg" />
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
