import { Item } from "../types";

interface IProps {
  items: Item[];
  INVENTORY_WIDTH: number;
  INVENTORY_HEIGHT: number;
}

export const validateInventoryData = ({
  items,
  INVENTORY_WIDTH,
  INVENTORY_HEIGHT,
}: IProps) => {
  for (const item of items) {
    if (!["potion", "weapon", "armor"].includes(item.type)) {
      return `Неверный тип предмета: ${item.type}`;
    }

    if (!["common", "rare", "epic"].includes(item.rarity)) {
      return `Неверная редкость предмета: ${item.rarity}`;
    }

    if (
      item.x < 0 ||
      item.y < 0 ||
      item.x + item.width > INVENTORY_WIDTH ||
      item.y + item.height > INVENTORY_HEIGHT
    ) {
      return `Предмет выходит за пределы инвентаря (предмет: ${JSON.stringify(
        item
      )})`;
    }

    for (const otherItem of items) {
      if (otherItem === item) continue;
      const doesOverlap = !(
        item.x + item.width <= otherItem.x ||
        item.x >= otherItem.x + otherItem.width ||
        item.y + item.height <= otherItem.y ||
        item.y >= otherItem.y + otherItem.height
      );
      if (doesOverlap) {
        return `Предметы пересекаются (предметы: ${JSON.stringify(
          item
        )} и ${JSON.stringify(otherItem)})`;
      }
    }
  }
  return null;
};
