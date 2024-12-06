import { useState, useEffect } from "react";
import { InventoryGrid } from "../InventoryGrid/InventoryGrid";
import { validateInventoryData } from "../../utils/validations";
import { Item } from "../../types";
import "./Inventory.css";

const INVENTORY_WIDTH = 12;
const INVENTORY_HEIGHT = 8;

export const Inventory = () => {
  const [gridData, setGridData] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInventoryData = async () => {
      try {
        const response = await fetch("/data/inventory1.json");
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные");
        }
        const data: Item[] = await response.json();
        const validationError = validateInventoryData({
          data,
          INVENTORY_WIDTH,
          INVENTORY_HEIGHT,
        });
        if (validationError) {
          setError(validationError);
        } else {
          setGridData(data);
          setError(null);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных инвентаря:", error);
        setError("Ошибка загрузки данных инвентаря");
      }
    };

    loadInventoryData();
  }, []);

  return (
    <div className="inventory-container">
      <h1>Инвентарь</h1>
      {error && <p className="error">{error}</p>}
      <InventoryGrid
        gridData={gridData}
        width={INVENTORY_WIDTH}
        height={INVENTORY_HEIGHT}
      />
    </div>
  );
};
