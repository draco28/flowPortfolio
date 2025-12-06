"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type AvatarPose = "standing" | "thinking" | "coding";

interface AnimatedAvatarProps {
  pose?: AvatarPose;
  className?: string;
}

export function AnimatedAvatar({ pose = "standing", className = "" }: AnimatedAvatarProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const poses = {
    standing: { headRotation: 0, headY: 0, bodyRotation: 0, armLeftRotation: 0, armRightRotation: 0, shoulderY: 0 },
    thinking: { headRotation: -8, headY: -3, bodyRotation: -3, armLeftRotation: -40, armRightRotation: 15, shoulderY: -2 },
    coding: { headRotation: 10, headY: 5, bodyRotation: 3, armLeftRotation: -25, armRightRotation: -25, shoulderY: 3 },
  };

  const currentPose = poses[pose];

  return (
    <motion.svg
      viewBox="0 0 240 320"
      className={`w-full h-full max-w-[260px] md:max-w-[300px] ${className}`}
      style={{ filter: "drop-shadow(0 30px 60px rgba(255, 139, 106, 0.3))" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <defs>
        {/* Enhanced gradients */}
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFDAB9" />
          <stop offset="50%" stopColor="#F4C4A0" />
          <stop offset="100%" stopColor="#E8B896" />
        </linearGradient>
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D2D2D" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8B6A" />
          <stop offset="50%" stopColor="#FF7A55" />
          <stop offset="100%" stopColor="#E67759" />
        </linearGradient>
        <linearGradient id="pantsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D3D3D" />
          <stop offset="100%" stopColor="#2A2A2A" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shadow filter */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* Body Group */}
      <g
        style={{
          transform: `rotate(${currentPose.bodyRotation}deg)`,
          transformOrigin: "120px 200px",
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Neck */}
        <ellipse cx="120" cy="130" rx="18" ry="12" fill="url(#skinGradient)" />

        {/* Torso / Shirt */}
        <path
          d="M75 138 Q120 125 165 138 L172 215 Q120 225 68 215 Z"
          fill="url(#shirtGradient)"
          filter="url(#dropShadow)"
        />

        {/* Shirt collar */}
        <path
          d="M95 138 L120 155 L145 138"
          stroke="#E67759"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* AI/Code symbol on shirt */}
        <g opacity="0.3">
          <text x="108" y="185" fill="#1A1A1A" fontSize="20" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
        </g>

        {/* Left Arm */}
        <g
          style={{
            transform: `rotate(${currentPose.armLeftRotation}deg) translateY(${currentPose.shoulderY}px)`,
            transformOrigin: "78px 145px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Upper arm */}
          <path
            d="M78 145 Q60 175 55 200"
            stroke="url(#shirtGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="52" cy="208" r="12" fill="url(#skinGradient)" />
        </g>

        {/* Right Arm */}
        <g
          style={{
            transform: `rotate(${currentPose.armRightRotation}deg) translateY(${currentPose.shoulderY}px)`,
            transformOrigin: "162px 145px",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Upper arm */}
          <path
            d="M162 145 Q180 175 185 200"
            stroke="url(#shirtGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="188" cy="208" r="12" fill="url(#skinGradient)" />
        </g>

        {/* Pants */}
        <path
          d="M80 215 L75 295 Q85 298 95 295 L105 230 L120 230 L135 295 Q145 298 155 295 L160 215 Q120 225 80 215"
          fill="url(#pantsGradient)"
        />

        {/* Belt */}
        <rect x="78" y="212" width="84" height="8" rx="2" fill="#1A1A1A" />
        <rect x="115" y="213" width="10" height="6" rx="1" fill="#A78BFA" />
      </g>

      {/* Head Group */}
      <g
        style={{
          transform: `rotate(${currentPose.headRotation}deg) translateY(${currentPose.headY}px)`,
          transformOrigin: "120px 75px",
          transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Ears */}
        <ellipse cx="68" cy="78" rx="8" ry="12" fill="url(#skinGradient)" />
        <ellipse cx="172" cy="78" rx="8" ry="12" fill="url(#skinGradient)" />

        {/* Head base */}
        <ellipse
          cx="120"
          cy="72"
          rx="52"
          ry="58"
          fill="url(#skinGradient)"
          filter="url(#softGlow)"
        />

        {/* Hair back */}
        <path
          d="M68 72 Q68 20 120 18 Q172 20 172 72"
          fill="url(#hairGradient)"
        />

        {/* Hair top/volume */}
        <path
          d="M75 55 Q90 15 120 12 Q150 15 165 55"
          fill="url(#hairGradient)"
        />

        {/* Hair side details */}
        <path
          d="M72 65 Q72 45 85 40"
          stroke="#3D3D3D"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hair shine */}
        <path
          d="M95 30 Q110 22 125 28"
          stroke="#4A4A4A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Eyebrows */}
        <path
          d="M88 58 Q95 55 105 58"
          stroke="#2D2D2D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M135 58 Q145 55 152 58"
          stroke="#2D2D2D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <g>
          {/* Eye whites */}
          <ellipse cx="97" cy="75" rx="12" ry="10" fill="white" />
          <ellipse cx="143" cy="75" rx="12" ry="10" fill="white" />

          {/* Iris and pupils */}
          <motion.g
            animate={{
              scaleY: isBlinking ? 0.1 : 1,
            }}
            transition={{ duration: 0.08 }}
            style={{ transformOrigin: "120px 75px" }}
          >
            <circle cx="98" cy="76" r="6" fill="#4A3728" />
            <circle cx="144" cy="76" r="6" fill="#4A3728" />
            <circle cx="98" cy="76" r="3" fill="#1A1A1A" />
            <circle cx="144" cy="76" r="3" fill="#1A1A1A" />
          </motion.g>

          {/* Eye shine */}
          {!isBlinking && (
            <>
              <circle cx="101" cy="73" r="2" fill="white" />
              <circle cx="147" cy="73" r="2" fill="white" />
              <circle cx="95" cy="78" r="1" fill="white" opacity="0.5" />
              <circle cx="141" cy="78" r="1" fill="white" opacity="0.5" />
            </>
          )}
        </g>

        {/* Nose */}
        <path
          d="M120 78 L118 92 Q120 95 122 92"
          stroke="#D4A88A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mouth / Smile */}
        <path
          d="M105 105 Q120 115 135 105"
          stroke="#C47D68"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Subtle smile line */}
        <path
          d="M108 108 Q120 112 132 108"
          stroke="#E8B896"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </g>

      {/* Floating AI elements around avatar */}
      <g opacity="0.6">
        <motion.g
          animate={{ y: [-3, 3, -3], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <circle cx="45" cy="100" r="8" fill="url(#accentGradient)" />
          <text x="42" y="104" fill="white" fontSize="8" fontWeight="bold">AI</text>
        </motion.g>

        <motion.g
          animate={{ y: [3, -3, 3], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <rect x="185" y="95" width="20" height="16" rx="3" fill="url(#accentGradient)" />
          <text x="189" y="106" fill="white" fontSize="7" fontFamily="monospace">{`{}`}</text>
        </motion.g>
      </g>
    </motion.svg>
  );
}
