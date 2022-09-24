interface FormLengthCounterProps {
  currentValue: string | number;
  maxValue: string | number;
}

function FormLengthCounter({ currentValue, maxValue }: FormLengthCounterProps) {
  return (
    <span style={{ fontSize: "0.9rem" }}>
      {currentValue}/{maxValue}
    </span>
  );
}

export default FormLengthCounter;
