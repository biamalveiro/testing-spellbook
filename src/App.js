import "./App.css";
import Chart from "./components/Chart";
import SpellList from "./components/SpellList";
import { useState } from "react";

function App() {
  const [activeType, setActiveType] = useState(null);

  return (
    <div className="p-4">
      <h1 className="ml-4 text-3xl text-purple-900 font-semibold ">
        🧙‍♀️ Spellbook
      </h1>
      <div className="flex flex-row h-screen">
        <SpellList activeType={activeType} />
        <Chart setActiveType={setActiveType} activeType={activeType} />
      </div>
    </div>
  );
}

export default App;
