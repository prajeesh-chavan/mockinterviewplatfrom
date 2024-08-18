import React, { useEffect, useRef } from "react";
import "./LargeHeader.css";
import { Circ } from "gsap";
import TweenLite from "gsap";

const LargeHeader = () => {
  const canvasRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    const initHeader = () => {
      width = document.documentElement.scrollWidth;
      height = document.documentElement.scrollHeight;
      target = { x: width / 2, y: height / 2 };

      largeHeader = headerRef.current;
      largeHeader.style.height = height + "px";

      canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");

      points = [];
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          const px = x + (Math.random() * width) / 20;
          const py = y + (Math.random() * height) / 20;
          const p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      for (let i = 0; i < points.length; i++) {
        const closest = [];
        const p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j];
          if (p1 !== p2) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      for (let i in points) {
        const c = new Circle(points[i], 5 + Math.random() * 5, "rgba(0, 153, 255, 0.8)"); // Changed to blue color
        points[i].circle = c;
      }
    };

    const addListeners = () => {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    };

    const mouseMove = (e) => {
      const posx = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      const posy = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      target.x = posx;
      target.y = posy;
    };

    const scrollCheck = () => {
      animateHeader = document.documentElement.scrollTop <= height;
    };

    const resize = () => {
      width = document.documentElement.scrollWidth;
      height = document.documentElement.scrollHeight;
      largeHeader.style.height = height + "px";
      canvas.width = width;
      canvas.height = height;
    };

    const initAnimation = () => {
      animate();
      for (let i in points) {
        shiftPoint(points[i]);
      }
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in points) {
          const distance = getDistance(target, points[i]);
          if (distance < 4000) {
            points[i].active = 0.8; // Increased active value
            points[i].circle.active = 0.8; // Match circle active value
          } else if (distance < 20000) {
            points[i].active = 0.5; // Increased active value
            points[i].circle.active = 0.5; // Match circle active value
          } else if (distance < 40000) {
            points[i].active = 0.3; // Increased active value
            points[i].circle.active = 0.3; // Match circle active value
          } else {
            points[i].active = 0.1; // Increased active value
            points[i].circle.active = 0.1; // Match circle active value
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: () => shiftPoint(p),
      });
    };

    const drawLines = (p) => {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = `rgba(0, 153, 255, ${p.active})`; // Changed to blue color
        ctx.lineWidth = 2; // Increased stroke width
        ctx.stroke();
      }
    };

    class Circle {
      constructor(pos, rad, color) {
        this.pos = pos || null;
        this.radius = rad || 5; // Increased default radius
        this.color = color || 'rgba(0, 153, 255, 0.8)'; // Changed to blue color
      }

      draw() {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(0, 153, 255, ${this.active})`; // Changed to blue color
        ctx.fill();
      }
    }

    const getDistance = (p1, p2) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    initHeader();
    initAnimation();
    addListeners();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div id="large-header" className="large-header" ref={headerRef}>
      <canvas id="demo-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default LargeHeader;
