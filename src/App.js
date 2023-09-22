import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VFlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChooseButton = styled.button`
  margin-top: 15px;
  margin-bottom: 15px;
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [nicknameArr, setNicknameArr] = useState([]);
  const [selectedNickname, setSelectedNickname] = useState("");

  function onChangeInput(event) {
    setInputValue(event.target.value);
  }

  function getNickname() {
    const data = localStorage.getItem("nickname");
    if (data === null) return;
    console.log(data);
    setNicknameArr(JSON.parse(data));
  }

  function onSubmit(event) {
    event.preventDefault();
    localStorage.setItem(
      "nickname",
      JSON.stringify([...nicknameArr, inputValue])
    );
    setNicknameArr((prev) => [...prev, inputValue]);
  }

  function random() {
    if (nicknameArr.length > 0) {
      const randomNum = Math.floor(Math.random() * (nicknameArr.length - 0));
      console.log(randomNum);
      alert(`${nicknameArr[randomNum]}`);
    } else {
      alert("저장된 닉네임이 없음");
    }
  }

  function reset() {
    localStorage.removeItem("nickname");
    setNicknameArr([]);
  }

  useEffect(() => {
    getNickname();
  }, []);

  useEffect(() => {
    setInputValue("");
  }, [nicknameArr]);

  return (
    <div className="App">
      <Container>
        <div>
          <VFlexBox>
            <form onSubmit={onSubmit}>
              <label>닉네임을 입력해주세요.</label>
              <input onChange={onChangeInput} value={inputValue}></input>
              <button type="submit">입력</button>
            </form>
            <ChooseButton onClick={random}>뽑기!</ChooseButton>
            <ChooseButton onClick={reset}>초기화!</ChooseButton>
            {nicknameArr.length > 0 &&
              nicknameArr.map((nick) => <span>{nick}</span>)}
          </VFlexBox>
        </div>
      </Container>
    </div>
  );
}

export default App;
