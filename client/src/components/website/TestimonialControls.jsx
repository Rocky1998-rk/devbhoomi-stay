import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const NAV_BUTTON_CLASS =
  "group w-12 h-11 rounded-xl bg-white hover:bg-[#0F1B2D] text-[#0F1B2D] hover:text-[#F7F3EA] border border-[#E0D7C9] hover:border-[#0F1B2D] shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer";

const TestimonialControls = ({
  total,
  currentIndex,
  onPrev,
  onNext,
  onSelect,
  cycleKey,
  autoplayInterval,
  reduceMotion = false,
  isPaused = false,
  onKeyDown,
}) => (
  <div className="mt-6 sm:mt-7" onKeyDown={onKeyDown}>
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Show previous guest review"
          className={NAV_BUTTON_CLASS}
        >
          <FiArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Show next guest review"
          className={NAV_BUTTON_CLASS}
        >
          <FiArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>

        <span className="ml-1 text-xs font-mono font-bold text-[#0F1B2D] select-none tabular-nums">
          {String(currentIndex + 1).padStart(2, "0")}
          <span className="text-[#718096] font-normal">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </span>

        <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 text-[11px] font-semibold text-[#8A8172] select-none">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPaused ? "bg-[#CFC6B6]" : "bg-[#D9A354]"
            }`}
            aria-hidden="true"
          />
          {isPaused ? "Paused" : "Auto-rotating"}
        </span>
      </div>

      <div
        role="group"
        aria-label="Choose a guest review"
        className="order-3 sm:order-none w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2"
      >
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelect?.(index)}
              aria-label={`Show guest review ${index + 1} of ${total}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "w-6 bg-[#D9A354]"
                  : "w-2 bg-[#CFC6B6] hover:bg-[#A7987F]"
              }`}
            />
          );
        })}
      </div>
    </div>

    {!reduceMotion && (
      <div className="mt-4 w-full h-1 bg-[#E7DFD3] rounded-full overflow-hidden">
        <motion.div
          key={cycleKey}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoplayInterval / 1000, ease: "linear" }}
          className="h-full bg-[#D9A354] rounded-full"
        />
      </div>
    )}
  </div>
);

export default TestimonialControls;
