"use client";
import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const YoutubePlayer = ({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <LiteYouTubeEmbed id={videoId} title={title} poster="hqdefault" />
    </div>
  );
};

export default YoutubePlayer;
