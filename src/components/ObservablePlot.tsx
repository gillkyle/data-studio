import * as Plot from "@observablehq/plot";
import { useParentSize } from "@visx/responsive";
import { useEffect, useRef } from "react";

export type PlotParams<T extends object> = {
  options?: Plot.PlotOptions;
  data: T[];
  width?: number;
  height?: number;
};
export function usePlot<T extends object>(params: PlotParams<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (params.data === undefined) {
      console.warn("No data provided to usePlot, skipping render");
      return;
    }
    const plot = Plot.plot({
      x: {
        grid: false,
        tickSize: 0,
      },
      y: {
        ticks: 3,
        grid: true,
        legend: true,
        tickSize: 0,
        // make grid lines dotted
      },
      width: params.width,
      height: params.height,
      color: { scheme: "burd" },
      marks: [
        Plot.ruleY([0], {
          strokeOpacity: 0,
        }),
        Plot["barY"](params.data, {
          x: "email",
          y: "total_views",
          // stroke: "blue",
          // strokeWidth: 3,
          // curve: "natural",
          // strokeDasharray: 6,
          tip: {
            pointerSize: 0,
            stroke: "#ded",
            textPadding: 12,
            pathFilter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.1))",
          },
        }),
      ],
      ...params?.options,
    });
    if (containerRef.current) {
      containerRef.current.append(plot);
    }
    return () => plot.remove();
  }, [params.data, params.height, params.width, params.options]);

  return { containerRef };
}

export function ObservablePlotBase<T extends object>(props: PlotParams<T>) {
  const { containerRef } = usePlot(props);

  return <div ref={containerRef} />;
}

export function ObservablePlot<T extends object>(props: PlotParams<T>) {
  const { parentRef, width, height } = useParentSize({ debounceTime: 150 });
  console.log({ width, height });
  return (
    <div
      ref={parentRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ObservablePlotBase width={width} height={height} {...props} />
    </div>
  );
}
