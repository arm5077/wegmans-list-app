import sharp from "sharp";

import getListEmbeddings from "@/utils/getListEmbeddings";
import matchToAisles from "@/utils/matchToAisles";

import { getChatCompletion, getSimpleChatCompletion } from "@/utils/openai";
import { TEXT_TO_ITEMS_PROMPT, IMAGE_TO_ITEMS_PROMPT } from "@/prompts";
import { successResponse, errorResponse } from "@/utils/responses";

export async function POST(request: Request) {
  const { base64Image } = await request.json()
  
  let pngBuffer;
  try {
    const buffer = Buffer.from(base64Image, 'base64');
    pngBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .png()
      .toBuffer();
  } catch (error) {
    return errorResponse(400, 'Image file is corrupted or unusuable')
  }
      
  const response = await getChatCompletion({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: IMAGE_TO_ITEMS_PROMPT
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/png;base64,${pngBuffer.toString('base64')}`
            }
          }
        ]
      }
    ]  
  })

  const { isGroceryList, items } = response;
  if (!isGroceryList) {
    return errorResponse(400, 'The supplied text doesn\'t appear to be a grocery list.')
  }
  
  const embeddings = await getListEmbeddings(items);
  const itemsWithAisles = await matchToAisles(embeddings);

  return successResponse(itemsWithAisles);

}