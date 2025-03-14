import React from "react";

interface TimeRangePickerProps {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  start,
  end,
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      <select
        value={start}
        onChange={(e) => onChange(e.target.value, end)}
        className="border rounded p-2"
      >
        <option value="">Hora Inicial</option>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}:00
          </option>
        ))}
      </select>
      <span>-</span>
      <select
        value={end}
        onChange={(e) => onChange(start, e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Hora Final</option>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}:00
          </option>
        ))}
      </select>
    </div>
  );
};
