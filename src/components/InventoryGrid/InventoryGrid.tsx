import { InventoryItem } from "../InventoryItem/InventoryItem";
import { Item } from "../../types";
import "./InventoryGrid.css";

interface InventoryGridProps {
  gridData: Item[];
  width: number;
  height: number;
}

export const InventoryGrid = ({
  gridData,
  width,
  height,
}: InventoryGridProps) => {
  const grid = Array(height)
    .fill(null)
    .map(() => Array(width).fill(null));

  gridData.forEach((item) => {
    for (let row = item.y; row < item.y + item.height; row++) {
      for (let col = item.x; col < item.x + item.width; col++) {
        grid[row][col] = item;
      }
    }
  });

  return (
    <div className="inventory-grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="cell">
            {cell && <InventoryItem item={cell} />}
          </div>
        ))
      )}
    </div>
  );
};
