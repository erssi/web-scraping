type LocalStorrageKey = 'accessToken';

export class LocalStorageService {
  static getItem = (keyItem: LocalStorrageKey): string | null => {
    return localStorage.getItem(keyItem);
  };

  static setItem = (keyItem: LocalStorrageKey, keyValue: any) => {
    localStorage.setItem(keyItem, keyValue);
  };

  static removeItem = (item: LocalStorrageKey) => {
    localStorage.removeItem(item);
  };
}
