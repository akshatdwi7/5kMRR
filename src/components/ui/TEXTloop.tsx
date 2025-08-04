import { TextLoop } from "../motion-primitives/text-loop";

export function TextLoopCustomVariantsTransition() {
  return (
    <p className="inline-flex whitespace-pre-wrap text-7xl font-thin text-zinc-600">
      Screeno is for{" "}
      <TextLoop
        className="overflow-y-clip"
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 80,
          mass: 10,
        }}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: "blur(4px)",
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: "blur(4px)",
          },
        }}
      >
        <span className="font-instrument italic "> "Retial" </span>
        <span className="font-instrument italic">"Student" </span>
        <span className="font-instrument italic">"Seasonal" </span>
        <span className="font-instrument italic">"GEN Z" </span>
      </TextLoop>{" "}
      <span> Investors </span>
    </p>
  );
}
