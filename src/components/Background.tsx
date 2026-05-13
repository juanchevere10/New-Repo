import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

const GlowOrb: React.FC<{
  cx: number;
  cy: number;
  color: string;
  radius: number;
  speed: number;
  phase?: number;
}> = ({ cx, cy, color, radius, speed, phase = 0 }) => {
  const frame = useCurrentFrame();
  const x = cx + Math.sin((frame + phase) * speed * 0.035) * 60;
  const y = cy + Math.cos((frame + phase) * speed * 0.028) * 45;
  return (
    <div
      style={{
        position: "absolute",
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}55 0%, ${color}18 45%, transparent 70%)`,
        filter: "blur(28px)",
        pointerEvents: "none",
      }}
    />
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gridOpacity = (0.05 + Math.sin(frame * 0.06) * 0.015).toFixed(3);

  return (
    <AbsoluteFill>
      {/* Deep space base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(155deg, #060612 0%, #0b0b22 40%, #130426 78%, #060612 100%)",
        }}
      />

      {/* Animated glow orbs */}
      <GlowOrb cx={width * 0.22} cy={height * 0.26} color="#7c3aed" radius={390} speed={1} />
      <GlowOrb cx={width * 0.82} cy={height * 0.54} color="#0891b2" radius={330} speed={0.75} phase={80} />
      <GlowOrb cx={width * 0.46} cy={height * 0.81} color="#db2777" radius={310} speed={0.55} phase={160} />

      {/* Perspective grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            `linear-gradient(rgba(139,92,246,${gridOpacity}) 1px, transparent 1px)`,
            `linear-gradient(90deg, rgba(139,92,246,${gridOpacity}) 1px, transparent 1px)`,
          ].join(","),
          backgroundSize: `${width / 7}px ${height / 14}px`,
        }}
      />

      {/* Radial vignette to focus the center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 110% 70% at 50% 50%, transparent 20%, rgba(6,6,18,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
