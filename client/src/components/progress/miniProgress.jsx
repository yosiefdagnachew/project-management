import React, { useEffect, useRef, useState } from "react";
import "../../styles/miniprogress.css";

export default function MiniProgress({ progress, animates, total }) {

  const progressRef = useRef(null);
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const progressElement = progressRef.current;
    const animationDuration = animates; // Animation duration in milliseconds
    const intervalDuration = 20; // Interval duration in milliseconds
    const frames = animationDuration / intervalDuration;
    let currentFrame = 0;
    const progressPercent = (progress / total) * 100; // Convert progress to percentage
    setDegree(progressPercent);
    const progressDegree = (progressPercent / 100) * 360; // Convert progress to degrees

    const animationInterval = setInterval(() => {
      const gradientDegree = (currentFrame / frames) * progressDegree; // Gradually increase the gradient degree
      progressElement.style.background = `conic-gradient(rgb(31, 119, 219), ${gradientDegree}deg, #79ffff 0deg)`;
      currentFrame++;

      if (currentFrame === frames) {
        clearInterval(animationInterval);
      }
    }, intervalDuration);

    return () => {
      clearInterval(animationInterval);
    };
  }, [progress, animates, total]);

  return (
    <div className="mini-circular-progress" ref={progressRef}>
      <sapn id="mini-number">{Math.floor(degree)}%</sapn>
    </div>
  );
}