import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useRef, useState } from "react"
import {AIButton} from "~features/AIButton"
import { GeneratorPopup } from "~features/GeneratorPopup"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async() =>
  document.querySelector(".msg-form__contenteditable")


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [showButton, setShowButton] = useState(false)
  const [showPopup, setShowPopup] = useState(false)


  const checkFocus = ()=>{
    const selector = document.getElementsByClassName("msg-form__contenteditable")
    if(!selector?.length) {
      console.error("Couldn't find input element!")
      return
    }
    const el = selector[0];
   setShowButton( document.activeElement===el||document.activeElement.tagName.includes("PLASMO")? true:false)
  }

  useEffect(()=>{
    document.addEventListener('focusin', checkFocus)
    return () => {
      document.removeEventListener('focusin', checkFocus)
  };
  },[])

  return (
    <div className="z-50">
    {showButton && <AIButton onClick={()=>setShowPopup(true)}/>}
    {showPopup && <GeneratorPopup close={()=>setShowPopup(false)}/>}
    </div>
  )
}

export default PlasmoOverlay
