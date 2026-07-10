import { z } from 'zod';

export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: z.object({
    front_default: z.string().nullable(),
    back_default: z.string().nullable(),
    front_shiny: z.string().nullable(),
    back_shiny: z.string().nullable(),
    other: z.object({
      official_artwork: z.object({
        front_default: z.string().nullable(),
      }).optional(),
    }).optional(),
  }),
  types: z.array(z.object({
    type: z.object({
      name: z.string(),
    }),
  })),
  stats: z.array(z.object({
    stat: z.object({
      name: z.string(),
    }),
    base_stat: z.number(),
  })),
  abilities: z.array(z.object({
    ability: z.object({
      name: z.string(),
    }),
    is_hidden: z.boolean(),
  })),
  moves: z.array(z.object({
    move: z.object({
      name: z.string(),
    }),
  })).optional(),
});

export const PokemonListItemSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const PokemonListSchema = z.object({
  results: z.array(PokemonListItemSchema),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

export const SpeciesSchema = z.object({
  id: z.number(),
  evolution_chain: z.object({
    url: z.string(),
  }),
  evolves_from_species: z.object({
    name: z.string(),
  }).optional().nullable(),
});

export const EvolutionChainSchema = z.object({
  chain: z.any(), // Recursive type, we'll parse manually
});

export const GenerationSchema = z.object({
  pokemon_species: z.array(z.object({
    name: z.string(),
  })),
});

export const TypeSchema = z.object({
  pokemon: z.array(z.object({
    pokemon: z.object({
      name: z.string(),
    }),
  })),
});

export const BerrySchema = z.object({
  id: z.number(),
  name: z.string(),
  firmness: z.object({
    name: z.string(),
  }).optional(),
  flavors: z.array(z.object({
    flavor: z.object({
      name: z.string(),
    }),
    potency: z.number(),
  })).optional(),
  growth_time: z.number().optional(),
  size: z.number().optional(),
});

export const BerryListSchema = z.object({
  results: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })),
  next: z.string().nullable(),
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
export type PokemonListItem = z.infer<typeof PokemonListItemSchema>;
export type PokemonList = z.infer<typeof PokemonListSchema>;
export type Species = z.infer<typeof SpeciesSchema>;
export type Generation = z.infer<typeof GenerationSchema>;
export type TypeData = z.infer<typeof TypeSchema>;
export type Berry = z.infer<typeof BerrySchema>;
export type BerryList = z.infer<typeof BerryListSchema>;
