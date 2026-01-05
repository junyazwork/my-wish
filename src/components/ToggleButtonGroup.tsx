interface ToggleButtonGroupProps {
  value: boolean;
  onChange: (value: boolean) => void;
  leftLabel: string;
  rightLabel: string;
}

const ToggleButtonGroup = ({
  value,
  onChange,
  leftLabel,
  rightLabel,
}: ToggleButtonGroupProps) => {
  return (
    <div className="flex gap-0">
      <button
        onClick={() => onChange(false)}
        className={`px-6 py-2 text-sm rounded-l-md border transition-colors ${
          !value
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-muted text-muted-foreground border-border"
        }`}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => onChange(true)}
        className={`px-6 py-2 text-sm rounded-r-md border-l-0 border transition-colors ${
          value
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-muted text-muted-foreground border-border"
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default ToggleButtonGroup;
