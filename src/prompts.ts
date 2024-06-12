export const TEXT_TO_ITEMS_PROMPT = `
  Please take the following text and do two things:
  1. Decide whether or not this is a grocery list.
  2. Build an array of each item in the grocery list, separating out the name and quantity of each item.
    
  Here's the JSON format to export the data: 
  \`\`\`
    {
      "isGroceryList": boolean,
      "items": {
        "name": string;   // Green beans
        "amount": string  // 2 lbs
      }[];
    }
  \`\`\`

  And here's the raw list:
`;

export const IMAGE_TO_ITEMS_PROMPT = `
  Please take the following image and do three things:
  1. Process the image and extract the text without running any code.
  2. Decide whether or not this is a grocery list.
  3. Build an array of each item in the grocery list, separating out the name and quantity of each item.
    
  Here's the JSON format to export the data: 
  \`\`\`
    {
      "isGroceryList": boolean,
      "items": {
        "name": string;   // Green beans
        "amount": string  // 2 lbs
      }[];
    }
  \`\`\`
`;