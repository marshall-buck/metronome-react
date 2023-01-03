import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Pad from "./Pad";
import "./PadController.css";
import { mn } from "../models/metronome";
interface PadControllerPropsI {
  isAnimating: boolean;
  numberPads: number;
}

function PadController({ isAnimating, numberPads }: PadControllerPropsI) {
  const anF = useRef<number | null>();
  const [drawNote, setDrawNote] = useState<number | boolean>(false);

  /** turns on and removes anF when isAnimating changes */
  useEffect(() => {
    if (isAnimating) anF.current = requestAnimationFrame(animatePads);

    return () => cancelAnimationFrame(anF.current as number);
  }, [isAnimating]);

  /** Animation frame function. this will check when there is a new note
   * to be drawn and set state of new note,a nd re-render the pad container
   */
  function animatePads() {
    const beat = mn.shouldDrawNote();
    if (beat !== false) {
      setDrawNote(beat);
    }
    anF.current = requestAnimationFrame(animatePads);
  }

  const padsArray = Array.from({ length: numberPads }, (_, idx) => {
    return (
      <Pad key={idx} drawNote={drawNote} isAnimating={isAnimating} idx={idx} />
    );
  });

  return <div className="PadController">{padsArray}</div>;
}

export default PadController;
