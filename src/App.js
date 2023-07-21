import "./styles.css";
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion"
const listItems = [
  { name: "Michael Jordan", id: 1 },
  { name: "Kobe Bryant", id: 2 },
  { name: "LeBron James", id: 3 },
  { name: "Magic Johnson", id: 4 }
];

function App() {
  const [items, setItems] = useState(listItems);
  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map((item) => (
        // Change the li to Reorder.Item and add value prop
        <Reorder.Item key={item.id} value={item}>
          {item.name}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default App;
