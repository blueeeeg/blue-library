import { BottomFixedContainer } from "../components";

function BottomFixedContainerPage() {
  return (
    <div className="flex flex-col relative w-screen h-screen bg-[#F0F0F0]">
      <div className="w-full px-5 pt-5">
        <input
          className="w-full h-[50px] border-1 rounded-xl px-3"
          placeholder="click for keyboard"
        />
      </div>
      <BottomFixedContainer className="border-t-2 h-[100px] p-3 bg-white">
        <button className="bg-red-500 w-full h-[50px] rounded-xl">
          bottom fixed container
        </button>
      </BottomFixedContainer>
    </div>
  );
}

export default BottomFixedContainerPage;
