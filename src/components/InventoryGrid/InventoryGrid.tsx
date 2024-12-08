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

  const occupiedCells = new Set<string>();

  const rarityClasses = {
    common: "item-common",
    rare: "item-rare",
    epic: "item-epic",
  };

  gridData.forEach((item) => {
    for (let row = item.y; row < item.y + item.height; row++) {
      for (let col = item.x; col < item.x + item.width; col++) {
        const key = `${row}-${col}`;
        grid[row][col] = item;

        if (row === item.y && col === item.x) {
          occupiedCells.add(key);
        }
      }
    }
  });

  return (
    <div
      className="inventory-grid"
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const key = `${rowIndex}-${colIndex}`;
          const rarityClass =
            cell && cell.rarity
              ? rarityClasses[cell.rarity as Item["rarity"]]
              : "";

          return (
            <div key={key} className={`cell ${rarityClass}`}>
              {cell && occupiedCells.has(key) && (
                <InventoryItem item={cell} inventoryWidth={width} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
