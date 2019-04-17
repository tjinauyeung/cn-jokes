import StorageService from "./StorageService";
import RequestService from "./RequestService";

const ENDPOINTS = {
  joke: () => `http://api.icndb.com/jokes/random/1`,
  jokes: () => `http://api.icndb.com/jokes/random/10`
};

export class JokeService {
  request: RequestService;
  storage: StorageService;

  constructor(options: any = {}) {
    this.request = options.request || new RequestService();
    this.storage = options.storage || new StorageService();
  }

  getAll() {
    return this.request.get(ENDPOINTS.jokes()).then(res => res.value);
  }

  getRandom() {
    return this.request
      .get(ENDPOINTS.joke())
      .then(res => res.value)
      .then(jokeList => jokeList.length && jokeList[0]);
  }

  getFavourites() {
    return this.storage.getAll();
  }

  addToFavourites(jokeId: number, joke) {
    return this.storage.set(jokeId, joke);
  }

  removeFromFavourites(jokeId: number) {
    return this.storage.remove(jokeId);
  }
}
