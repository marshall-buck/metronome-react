import AudioControl, { AudioControlPropsI } from "./AudioControl";

const masterVolume = {
  type: "Master Volume",
  value: ".5",
  min: "0.001",
  max: "1",
  step: ".001",
};

const tempoControl = {
  type: "Tempo",
  value: "120",
  min: "20",
  max: "180",
  step: "1",
};

interface AudioControlPanelPropsI {
  changeMasterVolume: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  changeTempo: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
function AudioControlPanel({
  changeMasterVolume,
  changeTempo,
}: AudioControlPanelPropsI) {
  return (
    <div>
      <AudioControl {...masterVolume} handleValueChange={changeMasterVolume} />
      <AudioControl {...tempoControl} handleValueChange={changeTempo} />
    </div>
  );
}

export default AudioControlPanel;
