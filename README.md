# Data Studio

Data studio is a tool for exploring and visualizing data. It is built with React and TypeScript, and uses the Observable Plot library for rendering.

## Goals in building

### Page and Layout

The page shoud have a pane on the left for configuration, and a pane on the right for the plot. There should be a header bar on top with a logo and a share button on the top right

The configuratin panel should have a data grid to preview the data that has been selected, as well as a textarea to input JSON or CSV data, starting with CSV.

### Plot configuration

Data needs to be entered in a text area, and then persisted to the URL for shareability

Each Plot can render multiple marks. The form configuration should allow you to add one or multiple marks, but it should start with one by default that you can customize.

A single Mark Configuration option would that should be configurable via the UI:

- mark function type: barY, line, cell, dot, etc.
- xField: keyof T
- yField: keyof T
- strokeField?: keyof T (which colors it)
- fillField?: keyof T (which colors it in other cases, maybe these become one color config in the UI)

General plot configuration options that affect all marks:

- y
  - tickFormat like Plot.formatMonth("en", "short")

## Routing

Using tanstack router to get type safety on routes. The URL is the source of truth, which means the data that is saved can only be up to about 25,000 characters long. If that is exceeded, a warning should be shown to say why.
