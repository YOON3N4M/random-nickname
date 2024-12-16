export interface Category {
  id: string;
  name: string;
}

export interface Item {
  body: string;
  categoryId: string;
  id: string;
}

export interface LegacySaveDocument {
  items?: Item[];
  categories?: Category[];
}

export interface SaveDocument extends LegacySaveDocument {
  categoryList: Category[];
  itemList: Item[];
}
