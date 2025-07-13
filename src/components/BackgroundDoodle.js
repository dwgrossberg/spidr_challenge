import React from "react";
import "css-doodle";

const BackgroundDoodle = ({
  rule = `
          :doodle {
            @grid: 40x40;
            width: 100vw;
            height: 100vh;
            background: #272727;
            --mouse-x: 0.5;
            --mouse-y: 0.5;
          }

          @even {
            border: 1px solid rgba(69, 147, 162, 0.1);
            border-radius: 50%;
            transform: scale(@rand(0.8, 1.2)) rotate(@rand(0deg, 360deg))
              translateX(calc((@index % 5 - 2.5) * var(--mouse-x) * 5px))
              translateY(calc((@index % 5 - 2.5) * var(--mouse-y) * 5px));
            box-shadow: 0 0 6px rgba(69, 147, 162, 0.3);
            animation: subtle-pulse @rand(4s, 10s) ease-in-out infinite;
          }

          @odd {
            background: radial-gradient(
              circle at center,
              rgba(69, 147, 162, .2),
              transparent
            );
            opacity: @rand(0.03, 0.07);
            transform: rotate(@rand(0deg, 180deg));
          }

          @nth(3n) {
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          }

          @keyframes subtle-pulse {
            0%, 100% {
              opacity: 0.05;
              transform: scale(1) translateX(0) translateY(0);
            }
            50% {
              opacity: 0.15;
              transform: scale(1.1) translateX(calc(var(--mouse-x) * 2px)) translateY(calc(var(--mouse-y) * 2px));
            }
          }
        `,
}) => <css-doodle>{rule}</css-doodle>;

export default BackgroundDoodle;
