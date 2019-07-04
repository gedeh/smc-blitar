# Widget - API Kota Blitar

## Data Structure

Example of widget declaration to consume data from http://api.blitarkota.go.id

```json

"className": "s12 m6 l4",
"widget": {

    "type": "blitar-api",
    "display": {

        "title": "Kunjungan Pasien Berdasarkan Usia dan Jenis Kelamin",
        "url": "http://sik.blitarkota.go.id/",
        "accent": "red"

    },
    "chart": {

        "type": "bar",
        "height": 200

    },
    "url": "simpustronik/usia-jenkel-pasien",
    "label": "kelompok_umur",
    "data": [ "laki", "perempuan" ]
    "color": [ "#E59135", "#E1E535" ]
}

```

### Card

| Field  | Description | Examples |
|------------ |-------------|----------|
| `className` | CSS class name of a card. This follows sizing mechanism in bootstrap with 12 available columns in total. For example, `"s12 m6 l4"` means use 12 columns for small screen, 6 columns for medium screen, and 4 columns for large screen | `"s12 m6 l4"`, `"s6 m6 l6"`, `"s6 m4 l3"` |
| `widget` |  Widget. The following table describes each fields in [Widget](#widget) table | N/A |

### Widget

| Field  | Description | Examples |
|------------ |-------------|----------|
| `type` | Type of widget to use. Supported value is `"blitar-api"` | `"blitar-api"` |
| `display` | Configuration of how widget should be rendered. See [Display](#display) table | N/A |
| `chart` | Configuration of how chart should be rendered. See [Chart](#chart) table | N/A |
| `url` | Formatted Blitar API URL to retrieve the data from. An example of API endpoint from Blitar Kota is: _http://api.blitarkota.go.id/?data=simpustronik&user=dashboard&view=usia-jenkel-pasien_. From the full URL, configure the URL using format `data/view` query parameter | `"simpustronik/usia-jenkel-pasien"`, `"apbd/penerimaan"`, `"emonev/pemilihan_rup"`
| `label` | Field to be used as label from the API result. The field will be used as legend, label, and tooltip for the chart. For example the API response is `{ "urut": "1", "kelompok_umur": "0 - 7 hari", "laki": "40", "perempuan": "38", "jumlah": "78" }`, then the most appropriate label field is `"kelompok_umur"` | `"kelompok_umur"`, `"Pemilihan Penyedia"`, `"jenis_pengadaan_sirup"`
| `data` | Fields to be used as data from the API result. The field will be used as data-set of the chart. For example the API response is `{ "urut": "1", "kelompok_umur": "0 - 7 hari", "laki": "40", "perempuan": "38", "jumlah": "78" }`, then data fields can be an array `["perempuan", "laki", "total"]` | `["perempuan", "laki"]`, `["paket", "total"]`, `["pagu", "total"]`, `["total"]`
| `color` | Color to use as each bar background color when chart type value is `bar` or `line`. Use color-picker websites such as https://htmlcolorcodes.com/color-picker/ to select an appropriate color scheme | `["#E59135", "#E1E535"]`

### Display

| Field  | Description | Examples |
|------------ |-------------|----------|
| `title` | Title to display | `"This is an Example of Widget Title"` |
| `url` | URL to open when widget title is clicked | `"http://www.google.com"` |
| `accent` | Color of the  Supported colors are listed in example | `"red"`, `"pink"`, `"purple"`, `"deep-purple"`, `"indigo"`, `"blue"`, `"light-blue"`, `"cyan"`, `"teal"`, `"green"`, `"light-green"`, `"lime"`, `"yellow"`, `"amber"`, `"orange"`, `"deep-orange"` ,`"brown"`, `"grey"`, `"white"` |

### Chart

| Field name  | Description | Examples |
|------------ |-------------|----------|
| `type` | Chart type to render. Supported chart are listed in example | `"bar"`, `"line"`, `"pie"`, `"doughnut"` |
| `height` | Height of the chart. Use positive numbers | `200`, `250`, `300` |
