import { Box, Button } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { TbShare2 } from "react-icons/tb";
import { z } from "zod";
import { Logo } from "~/components/Logo";
import { PlotConfigurationForm } from "~/components/PlotConfigurationForm";
import { StudioPlot } from "~/components/StudioPlot";
import { csvSchema } from "~/core/zod-helpers";
import { useConfigurationState } from "~/hooks/useConfigurationState";

const studioConfigSchema = z.object({
  markType: z.enum(["barY", "rectY", "line", "cell", "dot"]).default("barY"),
  xField: z.string().default(""),
  yField: z.string().default(""),
  colorField: z.string().default(""),
  yTickFormat: z.string().default(""),
  data: csvSchema.catch("").default(""),
});
export type StudioConfig = z.infer<typeof studioConfigSchema>;

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: zodSearchValidator(studioConfigSchema),
});
Route.useSearch;

function HomeComponent() {
  const { activeData, activeFields, plotConfig } = useConfigurationState();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          p: 1,
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          minHeight: "50px",
        }}
      >
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            <Logo size={30} />
            Data Studio
          </Box>
        </Link>{" "}
        <Button
          variant="contained"
          startIcon={<TbShare2 size={16} />}
          onClick={() => {
            // copy the current full URL path to the clipboard
            navigator.clipboard.writeText(
              `${window.location.origin}${window.location.pathname}?${new URLSearchParams(
                window.location.search
              ).toString()}`
            );
          }}
        >
          Share
        </Button>
      </Box>
      <Box sx={{ display: "flex", flex: 1, height: "calc(100% - 50px)" }}>
        <Box
          sx={{
            width: "350px",
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            p: 1,
            overflowY: "auto",
          }}
        >
          <PlotConfigurationForm />
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 1,
            height: "calc(100% - 50px)",
            backgroundColor: "background.paper",
          }}
        >
          <StudioPlot
            data={activeData}
            studioOptions={{
              xField: plotConfig.xField || activeFields[0],
              yField: plotConfig.yField || activeFields[1],
              markType: plotConfig.markType,
              colorField: plotConfig.colorField,
              yTickFormat: plotConfig.yTickFormat,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
