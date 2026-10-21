(function () {
  const STORAGE_KEY = 'locofo-shortlist-v1';

  function read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function write(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  window.LocofoShortlist = {
    storageKey: STORAGE_KEY,
    getIds() {
      return read();
    },
    has(id) {
      return read().includes(id);
    },
    add(id) {
      const ids = read();
      if (!ids.includes(id)) {
        ids.push(id);
        write(ids);
      }
      return ids;
    },
    remove(id) {
      const ids = read().filter((x) => x !== id);
      write(ids);
      return ids;
    },
    count() {
      return read().length;
    },
    clear() {
      write([]);
    },
  };
})();
