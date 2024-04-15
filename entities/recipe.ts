import { z } from "zod";

export const ingredientsSchema = z.object({
  id: z.string(),
  value: z.string(),
  selected: z.boolean().optional(),
});

export type Ingredient = z.infer<typeof ingredientsSchema>;

export const methodStepSchema = z.object({
  id: z.string(),
  value: z.string(),
});

export type MethodStep = z.infer<typeof methodStepSchema>;

export const recipeSchema = z.object({
  title: z.string().describe("The title of the recipe"),
  ingredients: z
    .array(ingredientsSchema)
    .describe("The ingredients required for the recipe"),
  method: z
    .array(methodStepSchema)
    .describe("The steps of method of the recipe"),
  time: z.string().describe("The time in minutes required to cook the recipe"),
  portions: z.string().describe("The number of people the recipe serves"),
});

export type Recipe = z.infer<typeof recipeSchema>;
