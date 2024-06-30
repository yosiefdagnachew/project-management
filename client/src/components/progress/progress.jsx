import React, { useEffect, useRef, useState } from "react";
import "../../styles/progress.css";

export default function Progress({ progress, animates, total }) {
  const progressRef = useRef(null);
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const progressElement = progressRef.current;
    const animationDuration = animates; // Animation duration in milliseconds
    const intervalDuration = 20; // Interval duration in milliseconds
    const frames = animationDuration / intervalDuration;
    let currentFrame = 0;
    const progressPercent = ((progress / total) * 100).toFixed(0); // Convert progress to percentage
    setDegree(total === 0? 0:progressPercent);
    let progressDegree = (progressPercent / 100) * 360; // Convert progress to degrees

    if (progressDegree === 360) {
      progressDegree = (progressPercent / 100) * 360 + 7;
    }

    const animationInterval = setInterval(() => {
      const gradientDegree = (currentFrame / frames) * progressDegree; // Gradually increase the gradient degree
      progressElement.style.background = `conic-gradient(#429ff7, ${gradientDegree}deg, #63f5ff 0deg)`;
      currentFrame++;

      if (currentFrame === frames) {
        clearInterval(animationInterval);
      }
    }, intervalDuration);

    return () => {
      clearInterval(animationInterval);
    };
  }, [progress, animates, total]);

  useEffect(() => {
    slowIncrement(0, 10, degree, 1000); // Start the slow increment with a delay of 100 milliseconds
  }, [degree]);

  const slowIncrement = (num, increment, target, delay) => {
    let counter = num;
    const intervalId = setInterval(() => {
      counter += increment;
      if (counter >= target) {
        clearInterval(intervalId);
      }
    }, delay);
  };

  return (
    <div className="circular-progress" ref={progressRef}>
      <div className="number">{degree}%</div>
    </div>
  );
}
