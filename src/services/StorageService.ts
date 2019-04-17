class StorageService {
  storage: any;

  constructor(options: any = {}) {
    this.storage = options.storage || localStorage;
  }

  set(key, value) {
    this.storage.setItem(key, value);
    return this.getAll();
  }

  get(key) {
    this.storage.getItem(key);
    return this.getAll();
  }

  remove(key) {
    this.storage.removeItem(key);
    return this.getAll();
  }

  getAll() {
    return Object.keys(this.storage).reduce((result, item) => {
      result[item] = this.storage.getItem(item);
      return result;
    }, {});
  }
}

export default StorageService;
