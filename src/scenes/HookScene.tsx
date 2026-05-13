import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CYAN_BRIGHT, GRAY, PURPLE, PURPLE_BRIGHT, SAFE_BOTTOM, SAFE_TOP, SAFE_X } from "../constants";
import { WordReveal } from "../components/WordReveal";

const fontFamily = 'system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge: slides up + fades in
  const badgeOp = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const badgeY = interpolate(frame, [0, 18], [22, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Eyebrow text fade
  const eyeOp = interpolate(frame, [14, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const eyeY = interpolate(frame, [14, 32], [18, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "FREE" — spring scale + fade
  const freeScale = spring({
    fps,
    frame: Math.max(0, frame - 44),
    config: { damping: 14, stiffness: 180, mass: 0.7 },
    durationInFrames: 28,
  });
  const freeOp = interpolate(frame, [44, 56], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Gradient line ("Claude Code Skills") slide up
  const line2Op = interpolate(frame, [68, 88], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [68, 88], [40, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Divider wipe
  const divScale = interpolate(frame, [92, 112], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Pill tags
  const pillOp = interpolate(frame, [108, 130], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const pillY = interpolate(frame, [108, 130], [18, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Stats
  const statsOp = interpolate(frame, [126, 148], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const statsY = interpolate(frame, [126, 148], [18, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const pills = ["📦 packages", "🤖 agents", "💬 prompts"];

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
      }}
    >
      {/* Badge pill */}
      <div
        style={{
          opacity: badgeOp,
          transform: `translateY(${badgeY}px)`,
          marginBottom: 34,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(139,92,246,0.18)",
            border: "1.5px solid rgba(139,92,246,0.45)",
            borderRadius: 100,
            padding: "11px 26px",
            fontSize: 28,
            fontWeight: 700,
            color: PURPLE_BRIGHT,
            letterSpacing: "0.07em",
            textTransform: "uppercase" as const,
          }}
        >
          💡 Claude Code Tip
        </span>
      </div>

      {/* Eyebrow */}
      <div
        style={{
          opacity: eyeOp,
          transform: `translateY(${eyeY}px)`,
          fontSize: 40,
          color: GRAY,
          fontStyle: "italic",
          fontWeight: 400,
          marginBottom: 14,
        }}
      >
        did you know...
      </div>

      {/* "GitHub has" — word reveal */}
      <WordReveal
        text="GitHub has"
        startFrame={28}
        staggerFrames={10}
        style={{ marginBottom: 6 }}
        wordStyle={{
          fontSize: 108,
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 1.0,
          letterSpacing: "-0.025em",
        }}
      />

      {/* "FREE" — spring pop with gradient */}
      <div
        style={{
          opacity: freeOp,
          transform: `scale(${freeScale})`,
          transformOrigin: "left center",
          marginBottom: 10,
          lineHeight: 1.0,
        }}
      >
        <span
          style={{
            fontSize: 168,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            background: `linear-gradient(130deg, ${PURPLE_BRIGHT} 0%, #ec4899 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
          }}
        >
          FREE
        </span>
      </div>

      {/* "Claude Code Skills" — gradient slide up */}
      <div
        style={{
          opacity: line2Op,
          transform: `translateY(${line2Y}px)`,
          marginBottom: 38,
        }}
      >
        <span
          style={{
            fontSize: 90,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            background: `linear-gradient(130deg, ${PURPLE} 0%, ${CYAN_BRIGHT} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "inline-block",
            lineHeight: 1.05,
          }}
        >
          Claude Code Skills
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${PURPLE}, ${CYAN_BRIGHT})`,
          borderRadius: 2,
          transformOrigin: "left",
          transform: `scaleX(${divScale})`,
          marginBottom: 30,
        }}
      />

      {/* Pill tags row */}
      <div
        style={{
          opacity: pillOp,
          transform: `translateY(${pillY}px)`,
          display: "flex",
          gap: 16,
          flexWrap: "wrap" as const,
          marginBottom: 26,
        }}
      >
        {pills.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(6,182,212,0.13)",
              border: "1.5px solid rgba(6,182,212,0.32)",
              borderRadius: 8,
              padding: "9px 20px",
              fontSize: 30,
              color: CYAN_BRIGHT,
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats line */}
      <div
        style={{
          opacity: statsOp,
          transform: `translateY(${statsY}px)`,
          fontSize: 36,
          color: "#64748b",
          fontWeight: 500,
        }}
      >
        50+ ready-to-use skill packs on GitHub
      </div>
    </AbsoluteFill>
  );
};
