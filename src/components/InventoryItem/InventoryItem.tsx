import React from "react";
import "./InventoryItem.css";

interface Item {
  type: "potion" | "weapon" | "armor";
  rarity: "common" | "rare" | "epic";
  x: number;
  y: number;
  width: number;
  height: number;
}

interface InventoryItemProps {
  item: Item;
}

export const InventoryItem: React.FC<InventoryItemProps> = ({ item }) => {
  const { type, rarity, x, y, width, height } = item;

  const rarityClasses = {
    common: "item-common",
    rare: "item-rare",
    epic: "item-epic",
  };

  const typeClasses = {
    potion: "item-potion",
    weapon: "item-weapon",
    armor: "item-armor",
  };

  return (
    <div
      className={`inventory-item ${rarityClasses[rarity]} ${typeClasses[type]}`}
      style={{
        gridColumn: `${x + 1} / span ${width}`,
        gridRow: `${y + 1} / span ${height}`,
      }}
    >
      <span className="item-rarity">{type}</span>
    </div>
  );
};
