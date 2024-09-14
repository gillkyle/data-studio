import { useTheme } from "@mui/material";
import * as Plot from "@observablehq/plot";
import { ObservablePlot, PlotParams } from "~/components/ObservablePlot";
import { useConfigurationState } from "~/hooks/useConfigurationState";
import { StudioConfig } from "~/routes";

export type StudioPlotParams<T extends object> = PlotParams<T> & {
  studioOptions?: Omit<StudioConfig, "data">;
};

export function StudioPlot<T extends object>(params: StudioPlotParams<T>) {
  const theme = useTheme();
  const { activeData, activeFields, plotConfig } = useConfigurationState();
  return (
    <ObservablePlot
      {...params}
      options={{
        margin: 50, // Add default padding
        color: {
          scheme: "category10",
          type: "ordinal",
        },
        y: {
          tickFormat: "~s",
        },
        marks: [
          Plot[params.studioOptions?.markType || "barY"](params.data, {
            x: params.studioOptions?.xField,
            y: params.studioOptions?.yField,
            ...(["line"].includes(params.studioOptions?.markType || "")
              ? {
                  stroke:
                    params.studioOptions?.colorField ||
                    theme.palette.primary.main,
                }
              : {
                  fill:
                    params.studioOptions?.colorField ||
                    theme.palette.primary.main,
                }),
            interval: "week",
            ry2: 4,
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
      }}
    />
  );
}
