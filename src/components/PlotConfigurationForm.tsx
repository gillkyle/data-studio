import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { Table } from "~/components/Table";
import { useConfigurationState } from "~/hooks/useConfigurationState";

export function PlotConfigurationForm() {
  const {
    activeData: data,
    activeFields,
    urlDataString,
    plotConfig,
    updateConfig,
  } = useConfigurationState();

  return (
    <>
      {/* Existing CSV Data input */}
      <FormControl fullWidth margin="normal">
        <FormLabel>CSV Data</FormLabel>
        <Box
          component={TextareaAutosize}
          sx={{
            // style like other mui inputs
            width: "100%",
            minHeight: 50,
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.gray["200"]}`,
            padding: 1,
            fontFamily: "Inter",
            // only allow vertical resize
            resize: "vertical",
            maxHeight: 200,
            overflow: "auto",
          }}
          value={urlDataString}
          onChange={(e) => updateConfig({ data: e.target.value })}
        />
      </FormControl>

      {/* Demo CSV button */}
      <Link
        to="/"
        search={{
          data: DUMMY_DATA,
        }}
      >
        <Button variant="outlined" color="secondary">
          Load Demo CSV
        </Button>
      </Link>

      {/* Mark Configuration */}
      <FormControl fullWidth margin="normal">
        <FormLabel>Mark Type</FormLabel>
        <Select
          value={plotConfig.markType}
          onChange={(e) => updateConfig({ markType: e.target.value })}
        >
          <MenuItem value="barY">Bar Y</MenuItem>
          <MenuItem value="rectY">Rectangle Y</MenuItem>
          <MenuItem value="line">Line</MenuItem>
          <MenuItem value="cell">Cell</MenuItem>
          <MenuItem value="dot">Dot</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>X Field</FormLabel>
        <Select
          value={plotConfig.xField}
          onChange={(e) => updateConfig({ xField: e.target.value })}
        >
          {activeFields.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Y Field</FormLabel>
        <Select
          value={plotConfig.yField}
          onChange={(e) => updateConfig({ yField: e.target.value })}
        >
          {activeFields.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Color</FormLabel>
        <Select
          value={plotConfig.colorField}
          onChange={(e) => updateConfig({ colorField: e.target.value })}
        >
          <MenuItem value="">None</MenuItem>
          {activeFields.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Y-axis Tick Format */}
      <FormControl fullWidth margin="normal">
        <FormLabel>Y-axis Tick Format</FormLabel>
        <TextField
          value={plotConfig.yTickFormat}
          onChange={(e) => updateConfig({ yTickFormat: e.target.value })}
          placeholder="e.g., Plot.formatMonth('en', 'short')"
        />
      </FormControl>

      {/* Preview Table */}
      <FormControl fullWidth margin="normal">
        <FormLabel>Preview</FormLabel>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <PreviewTable />
        </Box>
      </FormControl>
    </>
  );
}

export function PreviewTable() {
  const { activeData, activeFields, urlDataString } = useConfigurationState();

  return (
    <Table
      variant="standard"
      columns={activeFields.map((field) => ({ field }))}
      rows={activeData}
      tableHeight={200}
    />
  );
}

const DUMMY_DATA =
  "date,sales_revenue,sales_volume,total_inventory,avg_current_price,avg_full_price\n2024-05-05,51508209.59,699087,103054789,84.502412,96.554493\n2024-05-12,51439282.66,691995,104640525,84.729947,96.670441\n2024-05-19,49783638.41,682674,103813800,85.044636,96.726338\n2024-05-26,55198211.61,762788,103415765,85.115028,96.920653\n2024-06-02,55106342.06,760703,104157830,84.356054,95.897690\n2024-06-09,56352283.58,775608,106039338,83.833587,95.999448\n2024-06-16,60407590.48,827548,102837991,84.614383,96.384917\n2024-06-23,55859668.26,765485,98061887,84.328802,96.157233\n2024-06-30,52974965.51,727021,95272961,83.983486,96.193617\n2024-07-07,53709860.06,739733,94429945,84.012210,96.196269\n2024-07-14,58519498.63,801625,94480472,84.247941,96.350697\n2024-07-21,54412715.90,742711,95227673,84.361508,96.505803\n2024-07-28,63482517.08,860273,96670952,84.443196,96.801855\n2024-08-04,47786568.80,639091,96758959,84.949578,97.241058\n2024-08-11,52287376.09,696958,94289537,84.935018,97.251146\n2024-08-18,50325947.08,659564,94828032,85.986566,97.708649\n2024-08-25,48416511.31,641180,94584003,85.398525,97.683478\n2024-09-01,46885335.67,611888,91807209,85.194818,97.552922";
