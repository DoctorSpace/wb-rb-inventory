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
  inventoryWidth: number;
}

export const InventoryItem = ({ item, inventoryWidth }: InventoryItemProps) => {
  const { rarity,type, width, height } = item;
  const cell = 600 / inventoryWidth - 2;

  return (
    <div
      className={"inventory-item"}
      style={{
        gridColumn: `span ${width}`,
        gridRow: `span ${height}`,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={`/images/${type}-${rarity}-icon.png`}
        alt={type}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${width * cell}px`,
          height: `${height * cell}px`,
          objectFit: "cover",
        }}
      />
      {/* <span className="item-rarity">{rarity}</span> */}
    </div>
  );
};
