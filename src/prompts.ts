export const TEXT_TO_ITEMS_PROMPT = `
  Please take the following text and do two things:
  2. Decide whether or not this is a grocery list. 
  A grocery list consists of items you could buy at a supermarket,
  including food, household items, and pharmacy items.
  2. Build an array of each item in the grocery list, 
  separating out the name and quantity of each item, 
  and formatting the names properly (fixing capitalization, etc.)
    
  Here's the JSON format to export the data: 
  \`\`\`
    {
      "isGroceryList": boolean,
      "isGroceryListReason": string, // one sentence explaining your decision
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
  2. Decide whether or not this is a grocery list. A grocery list consists of items you could buy at a supermarket,
  including food, household items, and pharmacy items.
  3. Build an array of each item in the grocery list, separating out the name and quantity of each item.
    
  Here's the JSON format to export the data: 
  \`\`\`
    {
      "isGroceryList": boolean,
      "isGroceryListReason": string, // one sentence explaining your decision
      "items": {
        "name": string;   // Green beans
        "amount": string  // 2 lbs
      }[];
    }
  \`\`\`
`;