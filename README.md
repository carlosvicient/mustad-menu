# \<mustad-menu>

This component is created for academic purposes and it will not be maintained. 

The webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

### Via npm

```bash
npm i @carlosvicient/mustad-menu
```

### Via CDN

You can also import the component in static pages using a CDN.

First, import the polyfills in case they are needed:

````html
<!-- Polyfills if needed -->
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
`````

Then, import the component using, for example, unpkg CDN as follows (you can replace `@latest` by the specific version you like):

````html
<!-- Load the Web Component via unpkg CDN -->
  <script type="module" src="https://unpkg.com/@carlosvicient/mustad-menu@latest/mustad-menu.js?module"></script>
````

Then, you can use the component as you like. For example:

````html
<mustad-menu day="Onsdag"></mustad-menu>
````

## Usage

### Via npm

```html
<script type="module">
  import '@carlosvicient/mustad-menu/mustad-menu.js';
</script>

<mustad-menu restaurant="kafekroken" day="Mandag"></mustad-menu>
```

### Via CDN

Just install the component as explained in the previous section (via CDN) and then use it as a normal html element.

Here you have a snippet you can try with some examples:

````html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mustad-menu webcompnent | examples </title>
  <style>

    article {
      max-width: 70ch;
    }

    #custom-styles {
      --mustad-menu-background-color: black;
      --mustad-menu-text-color: white;
      --mustad-menu-font-family: Courier;
      --mustad-menu-grid-gap: 1em;
    }
  </style>
</head>

<body>
  <!-- Polyfills if needed -->
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
  <!-- Load the Web Component via unpkg CDN -->
  <script type="module" src="https://unpkg.com/@carlosvicient/mustad-menu@latest/mustad-menu.js?module"></script>

  <h1>Examples <code>mustad-menu</code> web component</h1>
  <article>
    <h2>Default example</h2>
    <mustad-menu></mustad-menu>
  </article>

  <article>
    <h2>Specifying day of the week: Onsdag</h2>
    <mustad-menu day="Onsdag"></mustad-menu>
  </article>

  <article>
    <h2>Custom CSS styles</h2>
    <p>Changing color, background color, font and grid gap</p>
    <mustad-menu id="custom-styles"></mustad-menu>
  </article>

</body>

</html>
````

#### HTML attributes used to config the element

##### restaurant

Restaurant specifies the name of the "kantina" we want to retrieve the menu from. It only accepts two values. Be careful, the value is case sensitive.

| value  | url |
| ------------- | ------------- |
| kafekroken  | extracts the menus from 'https://mustadkantine.no/kafekroken' |
| brightcafe  | extracts the menus from 'https://mustadkantine.no/brightcafe' |

When this attribute is not specified, it defaults to "kafekroken".

##### day

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

When this attribute is not specified, it defaults to today's day of the week.

#### hide-restaurant

The name of the restaurant will be hidden if the attribute exists or it is set to `true`. 

````html
<mustad-menu hide-restaurant></mustad-menu>
<!-- or -->
<mustad-menu hide-restaurant="true"></mustad-menu>
<!-- or -->
<mustad-menu hide-restaurant="false"></mustad-menu>
````

#### hide-day

The name of the day will be hidden if the attribute exists or it is set to `true`. 

````html
<mustad-menu hide-day></mustad-menu>
<!-- or -->
<mustad-menu hide-day="true"></mustad-menu>
<!-- or -->
<mustad-menu hide-day="false"></mustad-menu>
````

#### hide-refresh

The refresh button will be hidden if the attribute exists or it is set to `true`.

The component caches the page for 1 week by default.

````html
<mustad-menu hide-refresh></mustad-menu>
<!-- or -->
<mustad-menu hide-refresh="true"></mustad-menu>
<!-- or -->
<mustad-menu hide-refresh="false"></mustad-menu>
````

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
