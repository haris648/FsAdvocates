/**
 * The firm's own pen — a real cutout, not an illustration.
 *
 * The soft shadow is a separate pre-blurred PNG (scripts/make-pen-shadow.mjs)
 * rather than a live `filter: drop-shadow()`, both for scroll-scrub
 * performance and because a filter isn't needed to get a shadow that rotates
 * cleanly with the pen — a plain rotated image with correct alpha does that
 * on its own.
 */
export function PenGraphic() {
  return (
    <div className="relative w-full h-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pen-shadow.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-auto translate-x-[6%] translate-y-[9%] select-none"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/pen.png" alt="" className="relative w-full h-auto select-none block" />
    </div>
  );
}
