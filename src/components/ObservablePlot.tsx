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
      ...params?.options,
      x: {
        grid: false,
        tickSize: 0,
        ...params?.options?.x,
      },
      y: {
        ticks: 3,
        grid: true,
        legend: true,
        tickSize: 0,
        // make grid lines dotted
        ...params?.options?.y,
      },
      width: params.width,
      height: params.height,
      color: {
        scheme: "category10",
        ...params?.options?.color,
      },
      marks: [
        Plot.ruleY([0], {
          strokeOpacity: 0,
        }),
        ...(params?.options?.marks || []),
      ],
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
