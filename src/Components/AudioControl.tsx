import { useState } from "react";

import "./AudioControl.css";

interface AudioControlPropsI {
  type: string;
  value: string;
  min: string;
  max: string;
  step: string;
  handleValueChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
/** Generic slider control
 * props {
 * type,
  value,
  min,
  max,
  step,
  handleValueChange,}
 */
function AudioControl(props: AudioControlPropsI) {
  const { type, value, min, max, step, handleValueChange } = props;
  const [rangeValue, setValue] = useState(value);

  function changeValue(e: React.SyntheticEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    setValue(target.value);
    handleValueChange(e);
  }

  return (
    <div className="AudioControl">
      <label htmlFor={type}>{type}</label>
      <input
        name={type}
        type="range"
        onChange={changeValue}
        min={min}
        max={max}
        step={step}
        value={rangeValue}
      ></input>
      <p>
        {type === "Master Volume"
          ? `${(parseFloat(rangeValue) * 100).toFixed(0)}%`
          : rangeValue}
      </p>
    </div>
  );
}

export default AudioControl;
// export type { AudioControlPropsI };
