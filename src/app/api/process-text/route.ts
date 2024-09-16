import { getSimpleChatCompletion } from "@/utils/api/openai";
import { TEXT_TO_ITEMS_PROMPT } from "@/prompts";
import getListEmbeddings from "@/utils/api/getListEmbeddings";
import matchToAisles from "@/utils/api/matchToAisles";
import { successResponse, errorResponse } from "@/utils/api/responses";
import aggregateAisles from "@/utils/api/aggregateAisles";

export async function POST(request: Request) {
  const { data } = await request.json()
  
  const response = await getSimpleChatCompletion(
    `${TEXT_TO_ITEMS_PROMPT} ${data}`
  );

  console.log(response);

  const { isGroceryList, items } = response;
  if (!isGroceryList) {
    return errorResponse(400, 'The supplied text doesn\'t appear to be a grocery list.')
  }

  const embeddings = await getListEmbeddings(items);
  const itemsWithAisles = await matchToAisles(embeddings);
  const aisles = aggregateAisles(itemsWithAisles);

  return successResponse({
    items,
    aisles
  });

}