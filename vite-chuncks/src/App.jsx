import React, { useState } from "react";
// import BigComponent from "./BigComponent";

const App = () => {
  const [showBigComponent, setShowBigComponent] = useState(false);

  const loadBigComponent = async () => {
    const module = await import("./BigComponent");
    setShowBigComponent(true);
  };

  return (
    <div>
      <button onClick={loadBigComponent}>Load Big Component</button>
      {showBigComponent && <BigComponent />}
    </div>
  );
};

export default App;
