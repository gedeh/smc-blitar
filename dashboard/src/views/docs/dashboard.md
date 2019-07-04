# Dashboard

## Data Structure

Example of dashboard declaration to render a dashboard

```json

// this example represent a dashboard containing 2 rows and each rows may contains a different number of columns
{
    "title": "Title of the Dashboard",
    "rows": [
        {
            "cols": [
                { ... },
                { ... },
                { ... }
            ]
        },
        {
            "cols": [
                { ... },
                { ... },
                { ... },
                { ... }
            ]
        }
    ]
}

```

### Dashboard

| Field  | Description | Examples |
|------------ |-------------|----------|
| `title` | Title of the dashboard to display | `"Dashboard of Something"` |
| `rows` | An array of rows to display in dashboard. Each row objects represent a single row in dashboard. Then each of them contains a single `cols` field | `[{ "cols": [{ ... }] }, { "cols": [{ ... }] }]` |
| `cols` | An array of columns to display in a row. Each column objects represent a single space to put a widget. See details of widget [here](./widgets.md) | `[{ ... }, { ... }, { ... }]` |
