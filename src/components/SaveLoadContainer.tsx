import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../lib/firebase/fbase";
import { Item } from "./AddNewItemContainer";
import { Category, SaveDocument } from "../types";
import { getLocalstorageItem, setLocalStorageItem } from "../utils";
import { LOCAL_STORAGE_KEY } from "../constants";
import {
  getSaveDocument,
  handleLegacyDocument,
  postSaveDocument,
} from "../services";
import { useToastLocal } from "./toast";

interface Props {
  categoryList: Category[];
  itemList: Item[];
  setCategoryList: React.Dispatch<React.SetStateAction<Category[]>>;
  setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function SaveLoad(props: Props) {
  const { categoryList, itemList, setCategoryList, setItemList } = props;
  const { toast } = useToastLocal();
  const [saveKey, setSaveKey] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSaveKey(e.target.value);
  }

  async function saveData(key: string) {
    if (key.length !== 6) {
      alert("세이브 키 6자리를 입력하세요.");
      return;
    }

    const isConfirm = window.confirm(
      "현재 데이터가 덮어씌어 집니다. 계속 진행할까요?"
    );

    if (!isConfirm) return;
    // 세이브키 저장
    setLocalStorageItem(LOCAL_STORAGE_KEY.saveKey, key);
    // 데이터 저장

    const data: SaveDocument = {
      itemList,
      categoryList,
    };

    await postSaveDocument(LOCAL_STORAGE_KEY.saveKey, data);

    toast("세이브를 정상적으로 저장했습니다.");
  }

  async function loadData(key: string) {
    if (key.length !== 6) {
      alert("불러올 세이브 키 6자리를 입력하세요.");
      return;
    }

    let res = await getSaveDocument(key);
    console.log(res);
    if (!res) {
      alert("저장된 데이터가 없습니다.");
      return;
    }

    toast("세이브를 정상적으로 불러왔습니다.");

    if (res.categories) {
      toast("구버전의 세이브 파일이 발견되어 업데이트 합니다.", "warn");
      res = await handleLegacyDocument(key, res);
      toast("업데이트가 완료 되었습니다.");
    }

    setItemList(res.itemList);
    setCategoryList(res.categoryList);
    setLocalStorageItem(LOCAL_STORAGE_KEY.saveKey, key);
  }

  // 로컬 스토리지에 키가 있으면 초기 진입시 자동 로드
  useEffect(() => {
    const key = getLocalstorageItem(LOCAL_STORAGE_KEY.saveKey);
    if (!key) return;
    setSaveKey((prev) => {
      loadData(key);
      return key;
    });
  }, []);

  return (
    <>
      <Flex
        direction={"column"}
        w={"100%"}
        border={"1px solid #d3d3d3"}
        p={"15px 20px"}
        borderRadius={"4px"}
      >
        <Flex alignItems={"center"} gap={"10px"}>
          <Input
            onChange={onChange}
            value={saveKey}
            placeholder="세이브 키 (숫자 6자리)"
            maxLength={6}
            required
            type="number"
          />
          <Flex gap={"5px"}>
            <Button onClick={() => saveData(saveKey)} size={"xs"}>
              저장하기
            </Button>
            <Button onClick={() => loadData(saveKey)} size={"xs"}>
              불러오기
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
