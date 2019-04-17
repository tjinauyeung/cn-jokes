import { Joke } from "../models/Joke";

export const makeJoke = (): Joke => {
  return {
    categories: [],
    id: Math.random()
      .toString(36)
      .substring(8),
    joke: Math.random()
      .toString(36)
      .substring(8)
  };
};

export const makeJokes = (length = 10): Joke[] =>
  Array.from({ length }).map(makeJoke);
