import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Background } from "./components/Background";
import { HookScene } from "./scenes/HookScene";
import { ReposScene } from "./scenes/ReposScene";
import { CTAScene } from "./scenes/CTAScene";

// Scene durations (frames at 30fps)
const HOOK_FRAMES = 165;   // 5.5s
const REPOS_FRAMES = 165;  // 5.5s
const CTA_FRAMES = 150;    // 5.0s
const TRANS_FRAMES = 15;   // 0.5s per transition

// Total = 165 + 165 + 150 - 15 - 15 = 450 (exactly 15 seconds)
export const TOTAL_FRAMES = HOOK_FRAMES + REPOS_FRAMES + CTA_FRAMES - TRANS_FRAMES * 2;

export const GithubSkillsVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Persistent animated background across all scenes */}
      <Background />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={HOOK_FRAMES}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANS_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={REPOS_FRAMES}>
          <ReposScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANS_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={CTA_FRAMES}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
