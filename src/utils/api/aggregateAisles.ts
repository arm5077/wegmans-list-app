import { Item, AisleList } from "@/types/list"

const aggregateAisles = (items: Item[]) => {
  const aggregatedItems = items.reduce((aisles: AisleList[], item: Item) => {
    const existingAisle = aisles.find((aisle) => aisle.name === item.location);
    if (existingAisle) {
      existingAisle.items.push(item);
    } else {
      aisles.push({
        name: item.location || 'Unknown',
        items: [item]
      });
    }
    return aisles;
  }, []);
  
  return aggregatedItems.sort((a, b) => a.name.localeCompare(b.name));
}

export default aggregateAisles;