import { FormLabel, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { generateId } from "../utils";

export interface Item {
  id: string;
  body: string;
  categoryId: string;
}

interface Props {
  setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedCategory: string | undefined;
}

export default function AddNewItemContainer(props: Props) {
  const { setItemList, selectedCategory } = props;

  const [itemBody, setItemBody] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItemBody(e.target.value);
  }

  function createNewItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedCategory === undefined || selectedCategory === "") {
      alert("선택된 카테고리가 없습니다.");
      return;
    }

    const newItem: Item = {
      id: generateId("item"),
      body: itemBody,
      categoryId: selectedCategory,
    };
    setItemBody("");
    setItemList((prev) => [...prev, newItem]);
  }

  return (
    <VStack
      w={"100%"}
      border={"1px solid #d3d3d3"}
      p={"15px 20px"}
      borderRadius={"4px"}
    >
      <form onSubmit={createNewItem} style={{ width: "100%" }}>
        <FormLabel>단어 추가</FormLabel>
        <Input
          value={itemBody}
          onChange={onChange}
          placeholder="추가할 단어를 입력하세요."
          required
        ></Input>
      </form>
    </VStack>
  );
}
