import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Pad from "./Pad";
import "./PadController.css";
import { mn } from "../models/metronome";
interface PadControllerPropsI {
  isAnimating: boolean;
  numberPads: number;
}

function PadController({ isAnimating, numberPads }: PadControllerPropsI) {
  const anF = useRef<number | null>();
  const [drawNote, setDrawNote] = useState<number | boolean>(
    mn.shouldDrawNote()
  );

  // const drawNote = useRef<number | boolean>(mn.shouldDrawNote());
  // const [isActive, setIsActive] =  useState(false)
  useLayoutEffect(() => {
    if (isAnimating) anF.current = requestAnimationFrame(animatePads);

    return () => cancelAnimationFrame(anF.current as number);
  }, [isAnimating]);

  function animatePads() {
    // drawNote.current = mn.shouldDrawNote();

    setDrawNote(mn.shouldDrawNote());
    // console.log(drawNote);
    // const drawNote = mn.shouldDrawNote();
    // console.log(drawNote);

    // const pads = document.querySelectorAll(".beat");
    // if (drawNote !== false) {
    //   pads.forEach((pad, idx) => {
    //     //  To highlight beat every n beats drawNote/ n
    //     // idx === drawNote / 2 will act like eight notes, must
    //     //  also set time sig beats to 8

    //     if (idx === (drawNote as number) / mn.drawBeatModifier) {
    //       pad.classList.toggle("active");
    //     } else pad.setAttribute("class", "beat");
    //   });
    // }
    // Set up to draw again
    anF.current = requestAnimationFrame(animatePads);
    // anF = requestAnimationFrame(animatePads);
  }

  const padsArray = Array.from({ length: numberPads }, (_, idx) => {
    // if (drawNote === false) return;
    // console.log(drawNote);
    // let isActive = false;
    // if (idx === (drawNote as number) / mn.drawBeatModifier) {
    //   isActive = true;
    // }
    // console.log("rerender 3heades");

    return (
      <Pad key={idx} drawNote={drawNote} isAnimating={isAnimating} idx={idx} />
    );
  });

  return <div className="PadController">{padsArray}</div>;
}

export default PadController;
