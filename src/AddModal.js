import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AddModal({
  isModalOn,
  setIsModalOn,
  setCategoryArr,
  setSelectedCategory,
}) {
  const [category, setCategory] = useState("");

  function addCategory(event) {
    event.preventDefault();
    localStorage.setItem(category, []);
    setCategoryArr((prev) => [...prev, category]);
    setCategory("");
    setIsModalOn(false);
  }
  function onChange(event) {
    setCategory(event.target.value);
  }

  return (
    <Modal isOpen={isModalOn} onClose={setIsModalOn}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>카테고리 추가</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={addCategory}>
            <FormLabel>카테고리 이름</FormLabel>
            <Input onChange={onChange} value={category}></Input>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={addCategory}>
            추가
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
