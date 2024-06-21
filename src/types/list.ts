export interface Item {
  name: string; // Green beans
  amount: string; // 2 lbs
  embedding?: number[];
  location?: string;
  category?: string;
  similarity?: number; 
}

export interface AisleList {
  name: string; // 1A
  items: Item[];
}

export interface GroceryList {
  uuid: string;
  aisles: AisleList[];
}

export interface ProcessingResponse {
  isGroceryList: boolean;
  items?: Item[];
}

export interface DataPayload {
  aisles: AisleList[];
  items: Item[]
}