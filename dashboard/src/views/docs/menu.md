# Menu

## Data Structure

Example of menu declaration to render menu in Dashboard

```json

[
    {
        "icon": "home",
        "name": "home",
        "dashboard": "index",
        "title": "Home"
    },
    {
        "icon": "domain",
        "name": "sample-menu",
        "title": "Menu Title",
        "child": [
            {
                "icon": "credit_card",
                "name": "sample-child-menu",
                "dashboard": "dashboard-of-menu",
                "title": "Child Menu #1"
            },
            ...
            {
                "icon": "person",
                "name": "another-sample-of-child-menu",
                "dashboard": "another-dashboard-of-menu",
                "title": "Child Menu #2"
            }
        ]
    },

]

```

## Menu

Menu is just an array of menu item. See [Menu Item](#menu-item) table.

## Menu Item

| Field  | Description | Examples |
|------------ |-------------|----------|
| `icon` | Icon of the menu. See available icons from https://material.io/tools/icons/?style=baseline | `"credit_card"`, `"donut_small"`, `"favorite"` |
| `name` | Name of the menu. Must be unique accross all menu items and only use combination of alphanumeric and dash characters | `"menu-name"`, `"another-menu-name-1"` |
| `title` | Title to display | `"Menu #1"`, `"Sample Text"` |
| `dashboard` | Dashboard page to render when menu item is clicked. Use filename of dashboard file in `/path/to/data/dashboard` directory. If menu item is collapsible to show/hide child menu items, do not add this field. See dashboard details [here](./dashboard.md) | `"dashboard-1"`, `"dashboard-2"`, `"a-dashboard"` |
| `child` | Child menu to show when menu item is expanded. The value is an array with each array item is a menu item | `[{ "icon": "person", "name": "a-child-menu", "dashboard": "a-dashboard", "title": "Child Menu" }]` |
