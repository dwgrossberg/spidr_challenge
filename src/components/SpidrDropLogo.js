import React, { useEffect, useState } from "react";
import logo from "../assets/final-spidr-logo.png"; // adjust this path as needed

function SpidrDropLogo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100); // slight delay before rendering
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        pointerEvents: "none",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      {visible && (
        <>
          <img
            src={logo}
            alt="Spidr Logo"
            style={{
              width: "80px",
              opacity: 0,
              animation: "drop-in 2s ease-out forwards",
              animationDelay: "0.3s",
            }}
          />
        </>
      )}
      <style>{`
        @keyframes drop-in {
          0% {
            transform: translateY(-200px);
            opacity: 0;
          }
          50% {
            transform: translateY(10px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes thread-grow {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            height: 80px;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default SpidrDropLogo;
