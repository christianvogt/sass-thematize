# sass-thematize

[![npm version](https://img.shields.io/npm/v/sass-thematize.svg?style=flat-square)](https://www.npmjs.com/package/sass-thematize)
[![Build Status](https://travis-ci.org/christianvogt/sass-thematize.svg?branch=master)](https://travis-ci.org/christianvogt/sass-thematize#)

A SASS utility for generating multiple themes.

Install with [npm](https://www.npmjs.com/):

npm:
```sh
npm install sass-thematize --save
```

## Usage

A lot of applications typically have light and dark themes. Often these applications want to utilize both themes on the same page. A typically pattern is to create _inverted_ colors. This requires duplicating rules but with a different set of colors. One approach to simplifying this is to write rules once, but generate multiple sets of those rules with different color, or other property, values.

The following example creates a single color palette with multiple themes.

```scss
// create your palettes
$theme-color-palette: (
  'blue': (
    1: #A3E9FF,
    2: #8ED5EF,
    3: #7AC1E0,
    4: #65ADD1,
    5: #519AC2,
    6: #3D86B2,
    7: #2872A3,
    8: #145E94,
    9: #004B85
  )
);

// define your theme properties
$themes: (
  'default': (
    font-size: 16px,
    text-color: black,
    background-color: white,
    primary-color: (blue, 6),
    button-color: '$text-color' // reference to `text-color`
  ),
  'dark': (
    text-color: white,
    background-color: black,
    primary-color: (blue, 3)
    // no need to re-define `button-color` because the reference will pick up the `dark` `text-color`
  )
);

// use the thematize mixin to generate multiple themes
@include thematize {
  .button {
    font-size: theme(font-size);
    color: theme(button-color);
    background-color: theme(background-color);

    &:hover,
    &:focus {
      color: theme(background-color);
      background-color: theme(primary-color)
    }

    &:active {
      color: theme(background-color);
      background-color: theme(primary-color, 2);
    }
  }
}
`````

The generated CSS from the above SASS is:

```css
.button {
  font-size: 16px;
  color: black;
  background-color: white;
}

.button:hover,
.button:focus {
  color: white;
  background-color: #3d86b2;
}

.button:active {
  color: white;
  background-color: #145e94;
}

.theme-dark .button {
  color: white;
  background-color: black;
}

.theme-dark .button:hover,
.theme-dark .button:focus {
  color: black;
  background-color: #7ac1e0;
}

.theme-dark .button:active {
  color: black;
  background-color: #519ac2;
}
```
