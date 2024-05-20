"use client"

import React, { useEffect, useRef } from 'react';

interface PercentageCircleProps {
  voteAverage: number;
  totalVotes: number;
  width: number;
  height: number;
}

export default function ChartCircle({ voteAverage, totalVotes, width, height }: PercentageCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 5;
    const percentage = (voteAverage / 10) * 100;
    const percentageRadians = (percentage / 100) * (2 * Math.PI);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'transparent';
    ctx.fill();

    // Draw percentage arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, percentageRadians - 0.5 * Math.PI);
    ctx.strokeStyle = '#5C0099';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw percentage text in the center
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 15px Montserrat';
    ctx.fillText(`${Math.round(percentage)}%`, centerX, centerY);
  }, [voteAverage, totalVotes, width, height]);

  return <canvas style={{ width: 'auto', height: height }} ref={canvasRef} />
}
