export const TEXT_TO_ITEMS_PROMPT = `
  Please take the following text and do two things:
  1. Decide whether or not this is a grocery list.
  2. Build an array of each item in the grocery list, separating out the name and quantity of each item.
    2a. Please add any additional grocery store context neccessary to the name. For example, "goldfish" should probably be "goldfish crackers," not an actual fish. 
  Here's the JSON format to export the data: 
  \`\`\`
    {
      "name": string;   // Green beans
      "amount": string  // 2 lbs
    }
  \`\`\`

  And here's the raw list:
`;