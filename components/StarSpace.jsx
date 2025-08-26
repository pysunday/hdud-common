// 星空
import React, { useEffect, useRef, useState } from 'react';

export default function StarSpace() {
  const canvasRef = useRef(null);
  const numStars = 2000;
  const radius = '0.' + Math.floor(Math.random() * 9 + 1);
  let stars = [];
  let animate = true;
  let focalLength = 0;
  let centerX = 0;
  let centerY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');

    const initializeStars = () => {
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
      focalLength = canvas.width * 2;

      stars = new Array(numStars).fill(0).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: '0.' + Math.floor(Math.random() * 99 + 1),
        t: Math.random() < 0.5,
      }));
    };

    const moveStars = () => {
      stars.forEach((star) => {
        star.z--;
        if (star.z <= 0) {
          star.z = canvas.width;
        }
      });
    };

    const drawStars = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
      }

      c.fillStyle = 'rgba(0,10,20,1)';
      c.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const pixelX = (star.x - centerX) * (focalLength / star.z) + centerX;
        const pixelY = (star.y - centerY) * (focalLength / star.z) + centerY;
        const pixelRadius = 1 * (focalLength / star.z);

        if (star.t) {
          c.beginPath();
          c.arc(pixelX, pixelY, pixelRadius, 0, Math.PI * 2, false);
          c.fillStyle = `rgba(209, 255, 255, ${star.o})`;
          c.fill();
        } else {
          c.fillStyle = `rgba(209, 255, 255, ${star.o})`;
          c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
        }
      });
    };

    const executeFrame = () => {
      if (!animate) return;
      requestAnimationFrame(executeFrame);
      moveStars();
      drawStars();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
    executeFrame();

    return () => {
      animate = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute w-full h-full block top-0 left-0 z-[-1]"
    />
  );
}
