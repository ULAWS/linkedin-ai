import { useRef, useState } from "react"
import ArrowIcon from "~/assets/images/rightArrow.svg"
import InsertIcon from "~/assets/images/insert.svg"
import RegenrateIcon from "~/assets/images/regenerate.svg"
import { INPUT_REPLY } from "~utils/constants"

interface IGeneratorPopup{
  close: ()=>void;
}

export const GeneratorPopup = ({close}:IGeneratorPopup) => {
  const [inputGiven, setInputGiven] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const generateResponse = ()=>{
    if(!inputRef?.current) return;
    setInputGiven(inputRef.current.value)
    inputRef.current.value =""
  }

  const insertResponse = (res:string)=>{
    const selector = document.getElementsByClassName("msg-form__contenteditable")
    if(!selector?.length) {
      console.error("Couldn't find input element!")
      return
    }
    const el = selector[0];
    el.innerHTML=res;
    const placeholderSelector = document.getElementsByClassName("msg-form__placeholder")
    console.log(placeholderSelector)

    if(!placeholderSelector?.length) {
      console.error("Couldn't find input placeholder element!")
      return
    }
    const placeholder = placeholderSelector[0];
    console.log(placeholder)
    placeholder.setAttribute("aria-label","")
    placeholder.setAttribute("data-placeholder","")
    close()
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#0D0D12]/20 flex justify-center items-center text-2xl">
      <div className="bg-[#F9FAFB] w-[570px] h-fit rounded-lg drop-shadow-[0px_0px_6px_rgba(0,0,0,0.1)] p-4">
          {inputGiven && <div className="flex flex-col text-[#666D80] mb-6 text-justify">
            <div className="ml-auto bg-[#DFE1E7] p-4 rounded-xl mb-6 max-w-[60%]">{inputGiven}</div>
            <div className="bg-[#DBEAFE] p-4 rounded-xl max-w-[60%]">{INPUT_REPLY}</div>
            </div>}
          <input ref={inputRef} id="aiInput" placeholder="Your prompt" className="w-full text-xl p-3 mb-8 border border-black/6 rounded-lg"></input>
          {inputGiven && <div className="flex w-fit ml-auto">
          <button className=" rounded-xl border border-2 border-[#666D80] p-4 ml-auto flex items-center mr-6" onClick={()=>insertResponse(INPUT_REPLY)}>
          <img src={InsertIcon} width={12} height={12}/>
          <span className="text-[#666D80] ml-2">Insert</span>
          </button>
            <button className="rounded-xl bg-[#3B82F6] p-4 ml-auto flex items-center" onClick={null}>
          <img src={RegenrateIcon} width={12} height={12}/>
          <span className="text-white ml-2">Regenerate</span>
          </button>
          </div>
          }
          {!inputGiven && <button className="rounded-xl bg-[#3B82F6] p-4 ml-auto flex items-center" onClick={generateResponse}>
          <img src={ArrowIcon} width={16} height={16}/>
          <span className="text-white ml-2">Generate</span>
          </button>}
      </div>
    </div>
  )
}
