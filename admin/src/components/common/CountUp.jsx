/**
 * Presentational counter for a single animated statistic.
 *
 * Only the numeric portion animates — callers render any suffix ("/5", "+",
 * "%") as a separate, static element next to this.
 */
const CountUp = ({ value, decimals = 0, isComplete = false }) => (
  <span
    className={`transition-opacity duration-500 ease-out ${
      isComplete ? "opacity-100" : "opacity-90"
    }`}
  >
    {value.toFixed(decimals)}
  </span>
);

export default CountUp;
