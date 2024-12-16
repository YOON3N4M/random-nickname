import { doc, getDoc, setDoc } from "firebase/firestore";
import { dbService } from "../lib/firebase/fbase";
import { SaveDocument } from "../types";
import { LOCAL_STORAGE_KEY } from "../constants";

export async function postSaveDocument(key: string, data: SaveDocument) {
  const docRef = doc(dbService, LOCAL_STORAGE_KEY.saveKey, key);
  await setDoc(docRef, data);
}

export async function getSaveDocument(key: string) {
  const docRef = doc(dbService, LOCAL_STORAGE_KEY.saveKey, key);

  try {
    const res = (await getDoc(docRef)).data() as SaveDocument;
    return res;
  } catch (err) {
    return null;
  }
}

export async function handleLegacyDocument(key: string, data: SaveDocument) {
  const newData: SaveDocument = {
    itemList: [],
    categoryList: [],
  };

  if (data.categories) {
    newData.categoryList = data.categories;
  }

  if (data.items) {
    newData.itemList = data.items;
  }

  await postSaveDocument(key, newData);
  return newData;
}
