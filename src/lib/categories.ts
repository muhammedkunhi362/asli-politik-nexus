export const categories = {
  geopolitics: {
    label: "Geopolitics",
    subcategories: [
      { value: "geopolitics_west", label: "West" },
      { value: "geopolitics_latin_america", label: "Latin America" },
      { value: "geopolitics_africa", label: "Africa" },
      { value: "geopolitics_middle_east", label: "Middle East" },
      { value: "geopolitics_asia_major", label: "Asia Major" },
      { value: "geopolitics_south_asia", label: "South Asia" },
      { value: "geopolitics_central_east_asia", label: "Central & East Asia" },
      { value: "geopolitics_southeast_asia", label: "Southeast Asia" },
    ],
  },
  india: {
    label: "India",
    subcategories: [
      { value: "india_national", label: "National" },
      { value: "india_regional", label: "Regional" },
    ],
  },
};

export type CategoryValue = 
  | "geopolitics_west"
  | "geopolitics_latin_america"
  | "geopolitics_africa"
  | "geopolitics_middle_east"
  | "geopolitics_asia_major"
  | "geopolitics_south_asia"
  | "geopolitics_central_east_asia"
  | "geopolitics_southeast_asia"
  | "india_national"
  | "india_regional";

export const getCategoryLabel = (value: CategoryValue): string => {
  for (const category of Object.values(categories)) {
    const sub = category.subcategories.find(s => s.value === value);
    if (sub) return sub.label;
  }
  return value;
};

export const getAllCategories = (): Array<{ value: string; label: string }> => {
  return Object.values(categories).flatMap(cat => cat.subcategories);
};