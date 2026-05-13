import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

interface WordRevealProps {
  text: string;
  startFrame: number;
  staggerFrames?: number;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  startFrame,
  staggerFrames = 7,
  style,
  wordStyle,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.2em", ...style }}>
      {words.map((word, i) => {
        const lf = frame - startFrame - i * staggerFrames;
        const opacity = interpolate(lf, [0, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(lf, [0, 20], [42, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              display: "inline-block",
              ...wordStyle,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
