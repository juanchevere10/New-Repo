import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CYAN_BRIGHT,
  GRAY,
  PURPLE,
  PURPLE_BRIGHT,
  SAFE_BOTTOM,
  SAFE_TOP,
  SAFE_X,
} from "../constants";
import { WordReveal } from "../components/WordReveal";

const fontFamily = 'system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bookmark emoji — spring pop
  const emojiScale = spring({
    fps,
    frame: Math.max(0, frame - 0),
    config: { damping: 12, stiffness: 200, mass: 0.5 },
    durationInFrames: 22,
  });
  const emojiOp = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Don't forget to" label
  const preOp = interpolate(frame, [14, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const preY = interpolate(frame, [14, 30], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Divider wipe
  const divScale = interpolate(frame, [62, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Follow for more" section
  const followOp = interpolate(frame, [75, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const followY = interpolate(frame, [75, 95], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // @handle — spring pop
  const handleScale = spring({
    fps,
    frame: Math.max(0, frame - 92),
    config: { damping: 14, stiffness: 180, mass: 0.6 },
    durationInFrames: 25,
  });
  const handleOp = interpolate(frame, [92, 104], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const tagOp = interpolate(frame, [110, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [110, 128], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Pulse glow on the handle box
  const glowIntensity = 0.15 + Math.sin(frame * 0.12) * 0.08;

  return (
    <AbsoluteFill
      style={{
        paddingTop: SAFE_TOP,
        paddingBottom: SAFE_BOTTOM,
        paddingLeft: SAFE_X,
        paddingRight: SAFE_X,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center" as const,
      }}
    >
      {/* Bookmark emoji */}
      <div
        style={{
          opacity: emojiOp,
          transform: `scale(${emojiScale})`,
          fontSize: 100,
          marginBottom: 20,
          lineHeight: 1,
        }}
      >
        🔖
      </div>

      {/* "Don't forget to" */}
      <div
        style={{
          opacity: preOp,
          transform: `translateY(${preY}px)`,
          fontSize: 40,
          color: GRAY,
          fontWeight: 400,
          fontStyle: "italic",
          marginBottom: 10,
        }}
      >
        don't forget to
      </div>

      {/* "SAVE THIS" — word reveal */}
      <WordReveal
        text="SAVE THIS"
        startFrame={28}
        staggerFrames={9}
        style={{ justifyContent: "center", marginBottom: 40 }}
        wordStyle={{
          fontSize: 140,
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
        }}
      />

      {/* Divider */}
      <div
        style={{
          height: 3,
          width: "100%",
          background: `linear-gradient(90deg, transparent, ${PURPLE}, ${CYAN_BRIGHT}, transparent)`,
          borderRadius: 2,
          transformOrigin: "center",
          transform: `scaleX(${divScale})`,
          marginBottom: 38,
        }}
      />

      {/* "Follow for more" */}
      <div
        style={{
          opacity: followOp,
          transform: `translateY(${followY}px)`,
          fontSize: 42,
          color: GRAY,
          fontWeight: 500,
          marginBottom: 20,
        }}
      >
        Follow for more AI dev tools
      </div>

      {/* @handle pill */}
      <div
        style={{
          opacity: handleOp,
          transform: `scale(${handleScale})`,
          marginBottom: 22,
          display: "inline-block",
        }}
      >
        <div
          style={{
            background: `rgba(139,92,246,${glowIntensity.toFixed(2)})`,
            border: `2px solid ${PURPLE}88`,
            borderRadius: 16,
            padding: "18px 42px",
            boxShadow: `0 0 40px rgba(139,92,246,${glowIntensity.toFixed(2)})`,
          }}
        >
          <span
            style={{
              fontSize: 58,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              background: `linear-gradient(130deg, ${PURPLE_BRIGHT} 0%, ${CYAN_BRIGHT} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
          >
            @yourhandle
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOp,
          transform: `translateY(${tagY}px)`,
          fontSize: 32,
          color: CYAN_BRIGHT,
          fontWeight: 600,
          letterSpacing: "0.03em",
        }}
      >
        ✨ New AI dev tools every day
      </div>
    </AbsoluteFill>
  );
};
