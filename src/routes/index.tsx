import { parse } from "@std/csv/parse";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import * as React from "react";
import { z } from "zod";
import { ObservablePlot } from "~/components/ObservablePlot";
import { csvSchema } from "~/core/zod-helpers";

const studioConfigSchema = z.object({
  data: csvSchema.catch("").default(""),
});

type StudioConfig = z.infer<typeof studioConfigSchema>;

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: zodSearchValidator(studioConfigSchema),
});

function HomeComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { data } = Route.useSearch();

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
  console.log(parsedFields);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div>
        <Link
          to="/"
          search={{
            data: "name,age\nJohn,20\nJane,21",
          }}
        >
          Try Dummy CSV
        </Link>
      </div>
      <textarea
        defaultValue={data}
        onChange={(e) => {
          navigate({
            search: (prev) => ({
              data: e.target.value,
            }),
          });
        }}
      />
      <div
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <ObservablePlot
          data={parsedData}
          xField={parsedFields[0]}
          yField={parsedFields[1]}
        />
      </div>
    </div>
  );
}

/* 
Each Plot can render multiple marks. 

A single Mark Configuration option would that should be configurable via the UI:
- mark function type: barY, line, cell, dot, etc.
- xField: keyof T
- yField: keyof T
- strokeField?: keyof T (which colors it)
- fillField?: keyof T (which colors it in other cases, maybe these become one color config in the UI)

General plot configuration options:
- y
  - tickFormat like Plot.formatMonth("en", "short")
*/
