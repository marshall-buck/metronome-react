import "./pad.css";
import { mn } from "../models/metronome";

interface PadPropsI {
  drawNote: boolean | number;
  isAnimating: boolean;
  idx: number;
  padClickHandler: (e: number) => void;
}

function Pad({ drawNote, isAnimating, idx, padClickHandler }: PadPropsI) {
  function padClicked() {
    padClickHandler(idx);
  }
  return (
    <>
      <div
        onMouseDown={padClicked}
        className={
          idx === (drawNote as number) / mn.drawBeatModifier && isAnimating
            ? "beat active"
            : "beat"
        }
      ></div>
    </>
  );
}

export default Pad;
