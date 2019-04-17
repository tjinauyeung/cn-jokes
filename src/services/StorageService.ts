import { Joke } from "../models/Joke";

interface StorageServiceOptions {
  storage?: Storage;
}

class StorageService {
  storage: Storage;

  constructor(options: StorageServiceOptions = {}) {
    this.storage = options.storage || localStorage;
  }

  set = (joke: Joke): Joke[] => {
    this.storage.setItem(joke.id, JSON.stringify(joke));
    return this.getAll();
  };

  get = (jokeId: string): Joke => {
    try {
      return JSON.parse(this.storage.getItem(jokeId));
    } catch (e) {
      return;
    }
  };

  remove = (joke: Joke): Joke[] => {
    this.storage.removeItem(joke.id);
    return this.getAll();
  };

  getAll = (): Joke[] => {
    return Object.keys(this.storage).reduce((result, id) => {
      return [...result, this.get(id)];
    }, []);
  };
}

export default StorageService;
