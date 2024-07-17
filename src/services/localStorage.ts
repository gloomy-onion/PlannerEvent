export enum LocalStorageKeys {
  TOKEN = 'token',
}

export const localStorageService = {
  get: (key: LocalStorageKeys) => localStorage.getItem(key),
  set: (key: LocalStorageKeys, value: unknown) => {
    const valueToString = JSON.stringify(value);

    localStorage.setItem(key, valueToString
    );
  },
};
