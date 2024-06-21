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

  const sortedItems = aggregatedItems.sort((a, b) => {
    const regex = /(\d+)|(\D+)/g;
    const aParts = a.name.match(regex) || 'Unknown';
    const bParts = b.name.match(regex) || 'Unknown';
  
    for (let i = 0; i < aParts.length && i < bParts.length; i++) {
      // If both parts are numbers, compare them as numbers
      if (!isNaN(Number(aParts[i])) && !isNaN(Number(bParts[i]))) {
        const diff = Number(aParts[i]) - Number(bParts[i]);
        if (diff !== 0) return diff;
      } else {
        // If one or both parts are not numbers, compare them as strings
        const diff = aParts[i].localeCompare(bParts[i]);
        if (diff !== 0) return diff;
      }
    }
  
    // If one string is a prefix of the other, the shorter string should come first
    return aParts.length - bParts.length;
  });
  
  return sortedItems;
}

export default aggregateAisles;