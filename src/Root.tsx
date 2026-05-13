import React from "react";
import { Composition } from "remotion";
import { GithubSkillsVideo, TOTAL_FRAMES } from "./GithubSkillsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GithubSkillsVideo"
        component={GithubSkillsVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
