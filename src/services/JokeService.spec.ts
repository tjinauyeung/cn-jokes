import { JokeService } from "./JokeService";
import { makeJokes, makeJoke } from "../tests/helpers";
import * as fetchMock from "fetch-mock";

const service = new JokeService();

const expectedJoke = makeJoke();
const expectedJokes = makeJokes(10);

// local helpers
const prepopulateStorage = jokes => jokes.forEach(service.storage.set);
const contains = (jokes, element) => jokes.some(joke => joke.id === element.id);

fetchMock
  .get(JokeService.ENDPOINTS.jokes, {
    type: "success",
    value: expectedJokes
  })
  .get(JokeService.ENDPOINTS.joke, {
    type: "success",
    value: [expectedJoke]
  });

describe("JokeService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getAll()", () => {
    it("returns all jokes from API", done => {
      service.getAll().then(jokes => {
        expect(jokes).toEqual(expectedJokes);
        done();
      });
    });
  });

  describe("getRandom()", () => {
    it("returns random joke from API", done => {
      service.getRandom().then(joke => {
        expect(joke).toEqual(expectedJoke);
        done();
      });
    });
  });

  describe("getFavourites()", () => {
    it("returns favourite jokes from storage", done => {
      const favourites = makeJokes(10);

      prepopulateStorage(favourites);

      service.getFavourites().then(faves => {
        expect(faves).toEqual(favourites);
        done();
      });
    });
  });

  describe("addToFavourites()", () => {
    it("adds joke to storage and returns remaining", done => {
      const existingJokes = makeJokes(3);
      const expected = makeJoke();

      prepopulateStorage(existingJokes);

      service
        .getFavourites()
        .then(favourites => {
          expect(favourites).toEqual(existingJokes);
        })
        .then(() => service.addToFavourites(expected))
        .then(favourites => {
          expect(favourites).toEqual([...existingJokes, expected]);
          done();
        });
    });
  });

  describe("removeFromFavourites", () => {
    it("removes joke from storage and returns remaining", done => {
      const remaining = makeJokes(3);
      const toBeRemoved = makeJoke();
      const all = [...remaining, toBeRemoved];

      prepopulateStorage(all);

      service
        .getFavourites()
        .then(favourites => {
          expect(favourites).toEqual(all);
          expect(contains(favourites, toBeRemoved)).toBe(true);
        })
        .then(() => service.removeFromFavourites(toBeRemoved))
        .then(favourites => {
          expect(favourites).toEqual(remaining);
          expect(contains(favourites, toBeRemoved)).toBe(false);
          done();
        });
    });
  });
});
