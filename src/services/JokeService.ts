import StorageService from "./StorageService";
import RequestService from "./RequestService";
import { Joke } from "../models/Joke";

interface JokeServiceOptions {
  request?: RequestService;
  storage?: StorageService;
}

const ENDPOINTS = {
  joke: `http://api.icndb.com/jokes/random/1`,
  jokes: `http://api.icndb.com/jokes/random/10`
};

export class JokeService {
  static ENDPOINTS = ENDPOINTS;

  request: RequestService;
  storage: StorageService;

  constructor(options: JokeServiceOptions = {}) {
    this.request = options.request || new RequestService();
    this.storage = options.storage || new StorageService();
  }

  getAll = (): Promise<Joke[]> => {
    return this.request.get(ENDPOINTS.jokes).then(res => res.value);
  };

  getRandom = (): Promise<Joke> => {
    return this.request
      .get(ENDPOINTS.joke)
      .then(res => res.value)
      .then(jokeList => jokeList.length && jokeList[0]);
  };

  getFavourites = (): Promise<Joke[]> => {
    return Promise.resolve(this.storage.getAll());
  };

  addToFavourites = (joke: Joke): Promise<Joke[]> => {
    return Promise.resolve(this.storage.set(joke));
  };

  removeFromFavourites = (joke: Joke): Promise<Joke[]> => {
    return Promise.resolve(this.storage.remove(joke));
  };
}
