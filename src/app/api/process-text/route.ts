import { getSimpleChatCompletion } from "@/utils/openai";
import { TEXT_TO_ITEMS_PROMPT } from "@/prompts";
import getListEmbeddings from "@/utils/getListEmbeddings";
import matchToAisles from "@/utils/matchToAisles";
import { successResponse, errorResponse } from "@/utils/responses";

export async function POST(request: Request) {
  const { text } = await request.json()
  const response = await getSimpleChatCompletion(
    `${TEXT_TO_ITEMS_PROMPT} ${text}`
  );

  const { isGroceryList, items } = response;
  if (!isGroceryList) {
    return errorResponse(400, 'The supplied text doesn\'t appear to be a grocery list.')
  }

  const embeddings = await getListEmbeddings(items);
  const itemsWithAisles = await matchToAisles(embeddings);

  return successResponse(itemsWithAisles);

}