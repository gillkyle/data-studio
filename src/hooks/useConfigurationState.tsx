import { parse } from "@std/csv/parse";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Route } from "~/routes";

export function useConfigurationState() {
  const { data, markType, xField, yField, colorField, yTickFormat } =
    Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  // convert the CSV in the string into JSON
  const parsedData = React.useMemo(() => {
    if (!data) return [];
    return parse(data, { skipFirstRow: true });
  }, [data]);

  // convert the headers from the CSV into a list
  const parsedFields = React.useMemo(() => {
    if (!data) return [];
    return parse(data)[0];
  }, [data]);

  const updateConfig = React.useCallback(
    (newConfig: Partial<typeof Route.useSearch>) => {
      // (newConfig: StudioConfig) => {
      navigate({
        search: (prev) => ({
          ...prev,
          ...newConfig,
        }),
      });
    },
    [navigate]
  );

  const DATE_FIELD_NAMES = [
    "date",
    "event_date",
    "event_datetime",
    "week",
    "month",
    "year",
    "quarter",
    "time",
  ];
  const dateFields = parsedFields.filter((field) =>
    DATE_FIELD_NAMES.includes(field.toLowerCase())
  );
  console.log(parsedData);
  // transforme the data to include an index as an id field for the data grid, as well as parsing fields to guess default states that sholud be set
  const transformedData = parsedData.map((row, index) => {
    // look for date fields to transform by looking at the field names in lower case, if we see one, parse it as a date so ObservablePlot can use it easier
    const newRow = { ...row, id: index };
    if (dateFields.length > 0) {
      dateFields.forEach((field) => {
        if (field in row) {
          // @ts-expect-error - field is not known to be a string
          newRow[field] = new Date(row[field]);
        }
      });
    }

    // attempt to parse the values as numbers with regex, if they are valid numbers, parse them as numbers
    Object.entries(newRow).forEach(([key, value]) => {
      if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!isNaN(parsed)) {
          // @ts-ignore
          newRow[key] = parsed;
        }
      }
    });

    return newRow;
  });
  console.log(transformedData);

  const maxYValue = yField
    ? transformedData.reduce((max, row) => {
        // @ts-expect-error - yField is not known to be a string
        return Math.max(max, row[yField]);
      }, 0)
    : undefined;
  console.log(maxYValue);

  return {
    urlDataString: data,
    activeData: transformedData,
    activeFields: parsedFields,
    plotConfig: {
      markType,
      xField,
      yField,
      colorField,
      yTickFormat,
    },
    updateConfig,
  };
}
