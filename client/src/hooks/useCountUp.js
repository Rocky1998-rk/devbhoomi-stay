import { useEffect, useRef, useState } from "react";

export const DEFAULT_COUNT_UP_DURATION = 2000;
export const DEFAULT_VIEWPORT_THRESHOLD = 0.25;

const easeOutCubic = (progress) => 1 - (1 - progress) ** 3;

/**
 * Pure interpolation for a single animation frame.
 * Exported so the arithmetic can be verified independently of the DOM.
 *
 * @param {number} target    final value
 * @param {number} progress  0 → 1 (already clamped by the caller)
 * @param {number} decimals  precision for decimal values (integers floor)
 */
export const getCountUpValue = (target, progress, decimals = 0) => {
  const current = target * easeOutCubic(progress);

  if (decimals > 0) return Number(current.toFixed(decimals));

  return Math.floor(current);
};

/**
 * useViewportTrigger — fires once, the first time the observed element becomes
 * `threshold` visible, then disconnects. Scrolling away and back can never
 * re-trigger it.
 *
 * @returns [ref to attach to the section, hasEntered]
 */
export const useViewportTrigger = (threshold = DEFAULT_VIEWPORT_THRESHOLD) => {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasEntered) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        setHasEntered(true);
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, hasEntered]);

  return [ref, hasEntered];
};

/**
 * useCountUp — counts from exactly 0 up to `target` on requestAnimationFrame
 * with an ease-out curve, once `start` becomes true.
 *
 * - Displayed state is initialised to 0, so the final number can only ever be
 *   reached through the animation (it is never rendered up front).
 * - The exact target is committed on the final frame, so the display never
 *   settles on a rounded or floating-point value.
 * - The rAF loop stops the moment progress reaches 1 and is cancelled on
 *   unmount; a ref guard makes a second run impossible.
 *
 * @returns [value, isComplete]
 */
export const useCountUp = (
  target,
  {
    duration = DEFAULT_COUNT_UP_DURATION,
    decimals = 0,
    start = false,
  } = {},
) => {
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const frameRef = useRef(0);
  const startTimeRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!start || hasStartedRef.current) return undefined;

    hasStartedRef.current = true;
    startTimeRef.current = null;

    const tick = (timestamp) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1,
      );

      if (progress < 1) {
        setValue(getCountUpValue(target, progress, decimals));
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      // Land on the exact target, never on a rounded remainder.
      cancelAnimationFrame(frameRef.current);
      setValue(target);
      setIsComplete(true);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, duration, decimals]);

  return [value, isComplete];
};
