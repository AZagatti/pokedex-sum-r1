import type { PokemonDetail } from './schemas';
import { PokemonDetailSchema, PokemonListSchema, SpeciesSchema, EvolutionChainSchema, GenerationSchema, TypeSchema, BerrySchema, BerryListSchema } from './schemas';

const API_BASE = 'https://pokeapi.co/api/v2';

const cache = new Map<string, unknown>();

async function fetchJson<T>(url: string, schema: any): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  const parsed = schema.parse(data);
  cache.set(url, parsed);
  return parsed;
}

export async function getPokemonList(limit: number, offset: number) {
  return fetchJson(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`, PokemonListSchema);
}

export async function getPokemonDetail(nameOrId: string | number) {
  return fetchJson(`${API_BASE}/pokemon/${nameOrId}`, PokemonDetailSchema);
}

export async function getSpecies(nameOrId: string | number) {
  return fetchJson(`${API_BASE}/pokemon-species/${nameOrId}`, SpeciesSchema);
}

export async function getEvolutionChain(url: string) {
  return fetchJson(url, EvolutionChainSchema);
}

export async function getGeneration(id: number) {
  return fetchJson(`${API_BASE}/generation/${id}`, GenerationSchema);
}

export async function getType(name: string) {
  return fetchJson(`${API_BASE}/type/${name}`, TypeSchema);
}

export async function getBerryList(limit: number, offset: number) {
  return fetchJson(`${API_BASE}/berry?limit=${limit}&offset=${offset}`, BerryListSchema);
}

export async function getBerryDetail(nameOrId: string | number) {
  return fetchJson(`${API_BASE}/berry/${nameOrId}`, BerrySchema);
}

export function clearCache() {
  cache.clear();
}