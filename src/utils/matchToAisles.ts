import similarity from "compute-cosine-similarity";
import directoryEmbeddings from '@/data/embeddings.json';
import { Item } from "@/types/list";

export default async function matchToAisles(items: Item[]) {

  const matchedList = await Promise.all(items.map(async (listItem) => {
    const nearestNeighbor = directoryEmbeddings.reduce((nearest, directoryItem) => {
      if (!Array.isArray(listItem.embedding) || !Array.isArray(directoryItem.embedding)) {
        throw new Error('Embedding is missing or not an array');
      }
      const similarityScore = similarity(listItem.embedding, directoryItem.embedding) || 0;
      if (similarityScore > nearest.similarity) {
        return { 
          location: directoryItem.location, 
          category: directoryItem.item, 
          similarity: similarityScore 
        };
      }
      return nearest;
    }, { location: '', category: '', similarity: -1 });

    return { 
      name: listItem.name,
      amount: listItem.amount, 
      location: nearestNeighbor.location, 
      category: nearestNeighbor.category,
      similarity: nearestNeighbor.similarity,
    };
  }));

  return matchedList;

}