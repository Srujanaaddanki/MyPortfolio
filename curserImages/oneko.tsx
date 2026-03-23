"use client";

import React, { useEffect, useState } from "react";

// Add specific offset here as user requested "greater offset"
const OFFSET_X = 40; // 40px to right
const OFFSET_Y = 40; // 40px below cursor

export function Oneko() {
  const [position, setPosition] = useState({ x: 32, y: 32 });
  const [frame, setFrame] = useState(0);
  const [variant, setVariant] = useState<string>("idle");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Show after mount to avoid hydration mismatch
    setIsVisible(true);

    let catX = 32;
    let catY = 32;
    let mousePosX = 32;
    let mousePosY = 32;
    
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    const catSpeed = 10;
    
    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const setSprite = (name: string, currentFrame: number) => {
      setVariant(name);
      setFrame(currentFrame);
    };

    const update = () => {
      frameCount += 1;

      // User requested "greater offset" - target is offset from mouse
      const targetX = mousePosX + OFFSET_X;
      const targetY = mousePosY + OFFSET_Y;
      
      const realDiffX = catX - targetX;
      const realDiffY = catY - targetY;
      const realDistance = Math.sqrt(realDiffX ** 2 + realDiffY ** 2);

      if (realDistance < catSpeed || realDistance < 48) {
        idleTime += 1;
        if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
          const availableIdleAnimations = ["sleeping", "scratchSelf"];
          if (catX < 32) availableIdleAnimations.push("scratchWallW");
          if (catY < 32) availableIdleAnimations.push("scratchWallN");
          if (catX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
          if (catY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
          idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
        }

        switch (idleAnimation) {
          case "sleeping":
            if (idleAnimationFrame < 8) {
              setSprite("tired", 0);
              break;
            }
            setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
            if (idleAnimationFrame > 192) {
              idleAnimation = null;
            }
            break;
          case "scratchWallN":
          case "scratchWallS":
          case "scratchWallE":
          case "scratchWallW":
          case "scratchSelf":
            setSprite(idleAnimation, idleAnimationFrame);
            if (idleAnimationFrame > 9) {
              idleAnimation = null;
            }
            break;
          default:
            setSprite("idle", 0);
            return;
        }
        idleAnimationFrame += 1;
      } else {
        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
          setSprite("alert", 0);
          idleTime = Math.min(idleTime, 7);
          idleTime -= 1;
          return;
        }

        // direction calculation
        let direction = "";

        const angle = Math.atan2(realDiffY, realDiffX);
        const deg = (angle * 180) / Math.PI;

        const dirE = deg > -22.5 && deg <= 22.5;
        const dirSE = deg > 22.5 && deg <= 67.5;
        const dirS = deg > 67.5 && deg <= 112.5;
        const dirSW = deg > 112.5 && deg <= 157.5;
        const dirW = deg > 157.5 || deg <= -157.5;
        const dirNW = deg > -157.5 && deg <= -112.5;
        const dirN = deg > -112.5 && deg <= -67.5;
        const dirNE = deg > -67.5 && deg <= -22.5;

        // Facing direction relative to target
        if (dirE) direction = "W";
        if (dirSE) direction = "NW";
        if (dirS) direction = "N";
        if (dirSW) direction = "NE";
        if (dirW) direction = "E";
        if (dirNW) direction = "SE";
        if (dirN) direction = "S";
        if (dirNE) direction = "SW";

        setSprite(direction, frameCount);

        catX -= (realDiffX / realDistance) * catSpeed;
        catY -= (realDiffY / realDistance) * catSpeed;

        setPosition({ x: catX, y: catY });
      }
    };

    let lastFrameTimestamp = 0;
    let req: number;

    const step = (timestamp: number) => {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        update();
      }
      req = window.requestAnimationFrame(step);
    };

    req = window.requestAnimationFrame(step);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(req);
    };
  }, []);

  if (!isVisible) return null;

  const spriteSets: Record<string, number[][]> = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]],
  };

  const spriteFrames = spriteSets[variant] || spriteSets.idle;
  const currentFrame = spriteFrames[frame % spriteFrames.length];

  const bgPosition = `${currentFrame[0] * 32}px ${currentFrame[1] * 32}px`;

  return (
    <div
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        position: "fixed",
        top: position.y - 16,
        left: position.x - 16,
        backgroundImage: "url('/oneko.gif')",
        backgroundPosition: bgPosition,
        imageRendering: "pixelated",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

export default Oneko;
