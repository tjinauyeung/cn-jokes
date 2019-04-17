class RequestService {
  fetch: GlobalFetch;

  constructor(options: any = {}) {
    this.fetch = options.fetch || fetch;
  }

  get(url) {
    return fetch(url)
      .then(res => res.json())
      .catch(e => {
        throw new Error(e.message);
      });
  }
}

export default RequestService;
