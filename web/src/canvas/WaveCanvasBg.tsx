import React, { useRef, useEffect, useState } from "react";
import { WaveGroup } from "./wave-animation/WaveGroup";

interface Props {
  width: number;
  height: number;
}

const WaveCanvasBg: React.FC<Props> = (props) => {
  const [context, setContext] = useState<any>(null);
  const { width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<any>();

  const waveGroup = new WaveGroup();

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  const animate = (time: number) => {
    context.clearRect(0, 0, width, height);
    waveGroup.draw(context);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      waveGroup.resize(width, height);
      setContext(ctx);
      //Our first draw
      if (context !== null) {
        requestRef.current = requestAnimationFrame(animate);
      }
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [context]);
  return <canvas ref={canvasRef} {...props} />;
};

export default WaveCanvasBg;
