import React, { useState } from "react";
import { LaunchDetails } from "../types";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LaunchItem: React.FC<{ launch: LaunchDetails }> = ({ launch }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <div className="p-4 rounded mb-2 shadow-md">
      <div className="flex flex-row gap-3 mb-3">
        <h2 className="font-bold text-2xl text-left">{launch.mission_name}</h2>
        <h4
          className={`p-1 text-xs font-bold pt-2 rounded ${
            launch.upcoming ? "bg-green-500" : "bg-blue-300"
          }`}
        >
          {launch.upcoming ? "Success" : "Upcoming"}
        </h4>
      </div>
      <div className={`flex flex-col ${isClicked ? "block" : "hidden"}`}>
        <div className="flex flex-row gap-3">
          <h3>
            {`${
              new Date().getFullYear() -
              new Date(launch.launch_date_local).getFullYear()
            } years ago`}
          </h3>
          <Link to={launch.links.article_link}>Article</Link>
          <Link
            to={`https://www.youtube.com/watch?v=${launch.links.youtube_id}`}
          >
            Video
          </Link>
        </div>
        <div className="flex flex-row gap-3 mt-3 mb-3">
          <img
            src={launch.links.mission_patch}
            alt="Description"
            className="w-[100px] h-[110px]"
          />
          <p className="pt-2 max-w-[500px] text-left">
            {launch.details ? launch.details : "No data"}
          </p>
        </div>
      </div>
      <div className="w-fit mt-4">
        <Button variant="contained" onClick={() => setIsClicked(!isClicked)}>
          {isClicked ? "Hide" : "View"}
        </Button>
      </div>
    </div>
  );
};

export default LaunchItem;
