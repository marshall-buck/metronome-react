import AudioControlPanel from "./AudioControlPanel";
import PadController from "./PadController";
import { mn } from "../models/metronome";
import { useEffect, useState } from "react";

function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {});
  function handleStart(e: React.SyntheticEvent<HTMLButtonElement>) {
    mn.start();
    setIsPlaying(!isPlaying);
    if (mn.isPlaying) {
      mn.scheduler();
      // startAnimation
    } else {
      mn.reset();
      // cancelAnimationFrame(anF);
    }
  }
  /** Changes Volume of metronome */
  function changeMasterVolume(e: React.SyntheticEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    mn.masterVolume = +target.value;
  }

  /** changes tempo of metronome */
  function changeTempo(e: React.SyntheticEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const tempo = +target.value;
    mn.tempo = tempo;
  }

  return (
    <div>
      <AudioControlPanel
        changeMasterVolume={changeMasterVolume}
        changeTempo={changeTempo}
      />
      <button onClick={handleStart} id="start">
        {!mn.isPlaying ? "start" : "pause"}
      </button>
      <select id="time-sig">
        <option value="1">4/4</option>
        <option value="0">3/4</option>
        <option value="2">5/4</option>
        <option value="3">6/4</option>
        <option value="4">6/8</option>
        <option value="5">7/8</option>
        <option value="6">9/8</option>
        <option value="7">12/8</option>
      </select>
      <select id="subdivisions">
        <option value="quarter">quarter</option>
        <option value="eighth">eighth</option>
        <option value="sixteenth">sixteenth</option>
        <option value="trips">trips</option>
      </select>
      <PadController />
    </div>
  );
}

export default Metronome;
