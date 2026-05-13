import React from "react";
import { loadFont } from "@remotion/google-fonts/Inter";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  CYAN,
  CYAN_BRIGHT,
  GOLD,
  GRAY,
  GREEN,
  PURPLE,
  PURPLE_BRIGHT,
  SAFE_BOTTOM,
  SAFE_TOP,
  SAFE_X,
} from "../constants";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

interface Repo {
  owner: string;
  repo: string;
  description: string;
  stars: string;
  tag: string;
  tagColor: string;
  icon: string;
}

const REPOS: Repo[] = [
  {
    owner: "remotion-dev",
    repo: "skills",
    description: "55 pre-built video creation agents",
    stars: "2.1k",
    tag: "VIDEO",
    tagColor: PURPLE,
    icon: "🎬",
  },
  {
    owner: "modelcontextprotocol",
    repo: "servers",
    description: "Official MCP skill servers & tools",
    stars: "11.2k",
    tag: "MCP",
    tagColor: CYAN,
    icon: "🔌",
  },
  {
    owner: "anthropics",
    repo: "anthropic-cookbook",
    description: "Expert Claude code patterns & recipes",
    stars: "8.4k",
    tag: "CLAUDE",
    tagColor: GREEN,
    icon: "📖",
  },
  {
    owner: "nicnocquee",
    repo: "claudecode-skills",
    description: "Community skill packs for Claude Code",
    stars: "891",
    tag: "SKILLS",
    tagColor: "#f59e0b",
    icon: "⚡",
  },
];

const RepoCard: React.FC<{ repo: Repo; enterFrame: number }> = ({
  repo,
  enterFrame,
}) => {
  const frame = useCurrentFrame();
  const lf = frame - enterFrame;

  const opacity = interpolate(lf, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(lf, [0, 22], [55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Subtle glow pulse on the border
  const borderGlow = 0.22 + Math.sin((frame + enterFrame) * 0.08) * 0.08;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        alignItems: "center",
        gap: 22,
        background: "rgba(255,255,255,0.04)",
        border: `1.5px solid rgba(139,92,246,${borderGlow.toFixed(2)})`,
        borderRadius: 20,
        padding: "22px 26px",
        boxShadow: `0 0 28px rgba(139,92,246,0.1)`,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `${repo.tagColor}22`,
          border: `1.5px solid ${repo.tagColor}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 34,
          flexShrink: 0,
        }}
      >
        {repo.icon}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* owner/repo */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          <span style={{ color: GRAY, fontWeight: 500 }}>{repo.owner}/</span>
          <span>{repo.repo}</span>
        </div>
        {/* description */}
        <div
          style={{
            fontSize: 26,
            color: GRAY,
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          {repo.description}
        </div>
      </div>

      {/* Right side: tag + stars */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            background: `${repo.tagColor}22`,
            border: `1px solid ${repo.tagColor}55`,
            borderRadius: 6,
            padding: "5px 12px",
            fontSize: 22,
            fontWeight: 700,
            color: repo.tagColor,
            letterSpacing: "0.08em",
          }}
        >
          {repo.tag}
        </span>
        <span
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: GOLD,
          }}
        >
          ⭐ {repo.stars}
        </span>
      </div>
    </div>
  );
};

export const ReposScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Header slides in from left
  const headerOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerX = interpolate(frame, [0, 22], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "on GitHub →" subtitle
  const subOp = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Header */}
      <div
        style={{
          opacity: headerOp,
          transform: `translateX(${headerX}px)`,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          Top Free Repos{" "}
          <span style={{ fontSize: 52 }}>👇</span>
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOp,
          fontSize: 32,
          color: CYAN_BRIGHT,
          fontWeight: 600,
          marginBottom: 38,
          letterSpacing: "0.02em",
        }}
      >
        → all contain Claude Code Skills
      </div>

      {/* Repo cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {REPOS.map((repo, i) => (
          <RepoCard key={repo.repo} repo={repo} enterFrame={22 + i * 24} />
        ))}
      </div>

      {/* Bottom note */}
      <div
        style={{
          opacity: interpolate(frame, [118, 138], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          marginTop: 28,
          fontSize: 28,
          color: "#475569",
          fontWeight: 500,
          textAlign: "center" as const,
        }}
      >
        install in seconds with{" "}
        <span style={{ color: PURPLE_BRIGHT, fontWeight: 700 }}>
          npx skills add
        </span>
      </div>
    </AbsoluteFill>
  );
};
