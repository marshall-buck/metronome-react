import "./pad.css";
import { mn } from "../models/metronome";
interface PadPropsI {
  drawNote: boolean | number;
  isAnimating: boolean;
  idx: number;
}

function Pad({ drawNote, isAnimating, idx }: PadPropsI) {
  return (
    <>
      <div
        className={
          idx === (drawNote as number) / mn.drawBeatModifier &&
          isAnimating &&
          drawNote !== false
            ? "beat active"
            : "beat"
        }
      ></div>
    </>
  );
}

export default Pad;
