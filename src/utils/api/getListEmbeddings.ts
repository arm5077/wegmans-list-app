import { EMBEDDING_MODEL } from '@/constants';
import { Item } from '@/types/list';

import { getEmbeddings } from './openai';

const getListEmbeddings = async (items: Item[]) => {
  const strings = items.map(obj => `This is a grocery store item: ${obj.name}`);  
  const embeddings = await getEmbeddings(strings, EMBEDDING_MODEL);
  return items.map((item, i) => ({
    ...item,
    embedding: embeddings.data[i].embedding
  }));
}

export default getListEmbeddings;