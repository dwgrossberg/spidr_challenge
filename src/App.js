import "./App.css";
import BackgroundDoodle from "./components/BackgroundDoodle";
import SpidrDropLogo from "./components/SpidrDropLogo";
import SpidrForm from "./components/SpidrForm";

function App() {
  return (
    <>
      <header className="Spidr Form"></header>
      <div
        className="App"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          background: "#272727",
        }}
      >
        <BackgroundDoodle />
      </div>
      <SpidrDropLogo />
      <SpidrForm />
    </>
  );
}

export default App;
