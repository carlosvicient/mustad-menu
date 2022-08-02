# \<mustad-menu>

This component is created for academic purposes and it will not be maintained. 

The webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i @carlosvicient/mustad-menu
```

## Usage

```html
<script type="module">
  import '@carlosvicient/mustad-menu/mustad-menu.js';
</script>

<mustad-menu restaurant="kafekroken" day="Mandag"></mustad-menu>
```
### restaurant

Restaurant specifies the name of the "kantina" we want to retrieve the menu from. It only accepts two values. Be careful, the value is case sensitive.

| value  | url |
| ------------- | ------------- |
| kafekroken  | extracts the menus from 'https://mustadkantine.no/kafekroken' |
| brightcafe  | extracts the menus from 'https://mustadkantine.no/brightcafe' |

When this attribute is not specified, it defaults to "kafekroken".

### day

It represents the day of the week. Menus are only available from Monday to Friday. It only accepts the day of the week in _Norwegian_ and it is case sensitive.

| value   |
| ------  | 
| Søndag  |
| Mandag  |
| Tirsdag |
| Onsdag  |
| Torsdag |
| Fredag  |
| Lørdag  |

When this attribute is not specified, it defaults to "kafekroken".

## Custom styles

You can customize the component styles using CSS Custom Styles.

The layout of the component is set as a grid container. Consider the following html structure for styling the component. 

````html
<div class="menu-container">
  <div class="title">...</div>
  <div class="dayOfWeek">...</div>
  <div class="menu">...</div>
  <button>↺</button>
</div>
````

| Custom property | Description | Default |
| --------------- | ----------- | ------- |
| --mustad-menu-font-size | font-size of the ".menu-container"  | 1rem |
| --mustad-menu-font-family | font-family of the ".menu-container" | 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif  |
| --mustad-menu-text-color  | color of the ".menu-container" | #000 |
| --mustad-menu-background-color  | background-color of the ".menu-container"  | #fff  |
| --mustad-menu-padding  | padding of the ".menu-container"  |  1.5rem |
| --mustad-menu-grid-template-rows  | grid-template-rows of the ".menu-container" | repeat(3, auto) |
| --mustad-menu-grid-template-columns  | grid-template-columns of the ".menu-container" | 1fr min-content  |
| --mustad-menu-grid-gap  | grid-gap of the ".menu-container"  |  0 |
| --mustad-menu-align-items  | align-items of the ".menu-container"  |  center |
| --mustad-menu-title-font-weight | font-weight of the ".title"  | bold |
| --mustad-menu-title-font-size | font-size of the ".title"  | 0.8rem |
| --mustad-menu-title-grid-area | grid-area of the ".title"  | 1 / 1 / span 1 / span 2 |
| --mustad-menu-day-font-weight | font-weight of the ".day"  | bold |
| --mustad-menu-day-font-size | font-size of the ".day"  | 1.5rem |
| --mustad-menu-day-grid-area | grid-area of the ".day"  | 2 / 1 / span 1 / span 2 |
| --mustad-menu-menu-grid-area | grid-area of the ".menu"  | 3 / 1 / span 1 / span 2 |
| --mustad-menu-error-color  | color of the text of the menu if it has the ".error" class  | #cc0000 |
| --mustad-menu-button-grid-area | grid-area of the "button"  | 1 / 2 / span 1 / span 1 |

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
