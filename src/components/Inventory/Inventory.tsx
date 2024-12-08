import { useState, useEffect } from "react";
import { InventoryGrid } from "../InventoryGrid/InventoryGrid";
import { validateInventoryData } from "../../utils/validations";
import { Item } from "../../types";
import "./Inventory.css";

interface JSON {
  inventory_width: number;
  inventory_height: number;
  items: Item[];
}

export const Inventory = () => {
  const [select, setSelect] = useState<string>("1");
  const [gridData, setGridData] = useState<Item[]>([]);
  const [inventoryWidth, setInventoryWidth] = useState<number>(0);
  const [inventoryHeight, setInventoryHeight] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInventoryData = async () => {
      try {
        const response = await fetch(`/data/inventory${select}.json`);
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные");
        }
        const data: JSON = await response.json();

        const validationError = validateInventoryData({
          items: data.items,
          INVENTORY_WIDTH: data.inventory_width,
          INVENTORY_HEIGHT: data.inventory_height,
        });
        if (validationError) {
          setError(validationError);
        } else {
          setGridData(data.items);
          setInventoryWidth(data.inventory_width);
          setInventoryHeight(data.inventory_height);
          setError(null);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных инвентаря:", error);
        setError("Ошибка загрузки данных инвентаря");
      }
    };

    loadInventoryData();
  }, [select]);

  return (
    <div className="inventory-container">
      <div className="inventory-select">
        <h1>Инвентарь</h1>

        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      {error ? (
        <p className="error">{error}</p>
      ) : (
        <InventoryGrid
          gridData={gridData}
          width={inventoryWidth}
          height={inventoryHeight}
        />
      )}
    </div>
  );
};
