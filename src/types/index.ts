export interface Item {
  type: "potion" | "weapon" | "armor";
  rarity: "common" | "rare" | "epic";
  x: number;
  y: number;
  width: number;
  height: number;
}
