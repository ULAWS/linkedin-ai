import { PlasmoGetInlineAnchor } from "plasmo"
import AIIcon from "~/assets/images/aiButton.svg"


  interface IAIButton{
    onClick: ()=>void;
  }

export const AIButton = ({onClick}:IAIButton) => {
  return (
    <button className="z-50 flex absolute top-28 left-[400px] w-16 h-16" onClick={onClick}>
      <img src={AIIcon} width={32} height={32}/>
    </button>
  )
}
