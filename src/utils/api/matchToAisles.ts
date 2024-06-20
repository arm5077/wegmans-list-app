import similarity from "compute-cosine-similarity";
import directoryEmbeddingsJson from '@/data/embeddings.json';
import { Item } from "@/types/list";

type DirectoryEmbedding = {
  name: string;
  location: string;
  embedding: number[];
}

type NearestEmbedding = {
  location: string;
  category: string;
  similarity: number;
}

export default async function matchToAisles(items: Item[]) {

  const directoryEmbeddings = directoryEmbeddingsJson as DirectoryEmbedding[];
  const matchedList = await Promise.all(items.map(async (listItem) => {
    const nearestNeighbor = directoryEmbeddings.reduce((nearest: NearestEmbedding, directoryItem: DirectoryEmbedding) => {
      if (!Array.isArray(listItem.embedding) || !Array.isArray(directoryItem.embedding)) {
        throw new Error('Embedding is missing or not an array');
      }
      const similarityScore = similarity(listItem.embedding, directoryItem.embedding) || 0;
      if (similarityScore > nearest.similarity) {
        return { 
          location: directoryItem.location, 
          category: directoryItem.name, 
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