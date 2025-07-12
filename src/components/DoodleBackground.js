import { useEffect } from "react";

function DoodleBackground() {
  useEffect(() => {
    // Ensure the script is loaded only once (safety check)
    const id = "css-doodle-script";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/css-doodle@0.34.7/css-doodle.min.js";
      script.id = id;
      document.body.appendChild(script);
    }
  }, []);

  const doodle = `
    <css-doodle>
      :doodle {
        @grid: 20x20;
        background: #0a0a0a;
        width: 100vw;
        height: 100vh;
      }

      @random {
        border-radius: 50%;
        background: @pick(#39ff14, #00ffff, #ff00ff);
        opacity: @rand(0.02, 0.05);
        width: @rand(2px, 4px);
        height: @rand(2px, 4px);
        animation: pulse @rand(4s, 12s) ease-in-out infinite;
      }

      @random {
        transform: rotate(@pick(0deg, 45deg, 90deg, 135deg));
        border: 1px solid @pick(#39ff14, #00ffff, #ff00ff);
        width: @rand(10%, 60%);
        height: 1px;
        opacity: 0.02;
        animation: drift @rand(6s, 20s) linear infinite;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.05; }
        50% { transform: scale(1.5); opacity: 0.1; }
      }

      @keyframes drift {
        0% { transform: translateX(0) rotate(0); }
        100% { transform: translateX(20px) rotate(0); }
      }
    </css-doodle>
  `;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
      dangerouslySetInnerHTML={{ __html: doodle }}
    />
  );
}

export default DoodleBackground;
