import AudioControlPanel from "./AudioControlPanel";
import PadController from "./PadController";
import { mn } from "../models/metronome";
import { useState } from "react";

function Metronome() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [beats, setBeats] = useState(4);

  function handleStart(e: React.SyntheticEvent<HTMLButtonElement>) {
    mn.start();

    if (mn.isPlaying) {
      mn.scheduler(); // kick off scheduling

      setIsAnimating(true);
    } else {
      mn.reset();
      setIsAnimating(false);
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

  /**handles subdivision change */
  function handleSubdivisions(e: React.SyntheticEvent<HTMLSelectElement>) {
    const target = e.target as HTMLSelectElement;

    mn.beatsToPlay(target.value);
  }
  /**handles time sig change, sets state to new beats per bar */
  function handleTimeSig(e: React.SyntheticEvent<HTMLSelectElement>) {
    const target = e.target as HTMLSelectElement;

    mn.timeSig = target.value;
    const newBeats = mn.timeSig;
    setBeats(newBeats.beats);
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
      <select onChange={handleTimeSig} id="time-sig">
        <option value="1">4/4</option>
        <option value="0">3/4</option>
        <option value="2">5/4</option>
        <option value="3">6/4</option>
        <option value="4">6/8</option>
        <option value="5">7/8</option>
        <option value="6">9/8</option>
        <option value="7">12/8</option>
      </select>
      <select onChange={handleSubdivisions} id="subdivisions">
        <option value="quarter">quarter</option>
        <option value="eighth">eighth</option>
        <option value="sixteenth">sixteenth</option>
        <option value="trips">trips</option>
      </select>
      <PadController numberPads={beats} isAnimating={isAnimating} />
    </div>
  );
}

export default Metronome;
