import "./pad.css";
import { mn } from "../models/metronome";

interface PadPropsI {
  drawNote: boolean | number;
  isAnimating: boolean;
  idx: number;
}

function Pad({ drawNote, isAnimating, idx }: PadPropsI) {
  const renderLogic = () => {
    if (idx === (drawNote as number) / mn.drawBeatModifier && isAnimating) {
      return <div className="beat active"></div>;
    } else return <div className="beat"></div>;
  };

  return <>{renderLogic()}</>;
}

export default Pad;
