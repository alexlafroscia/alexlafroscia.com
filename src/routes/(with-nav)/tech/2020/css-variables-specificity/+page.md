---
title: Managing Specificity with CSS Variables
date: 2020-06-14
description: >-
  Have you ever run into issues around overriding properties of your shared CSS
  classes? Variables can help!
legacy: true
---

A recent project at work had me defining some shared button styles for us to use in conjunction with [Tailwind CSS](https://tailwindcss.com/). The styling is much like you might expect; a base `button` class with some specific "types" of buttons in different styles. For the purpose of illustration, imagine something like this:

```css
.button {
  color: black;
}

.button.type-plain {
  color: blue;
}
```

To render a "plain" button, you use the classes together on an element:

```html
<button class="button type-plain">Click me!</button>
```

While our design system system dictated that all "plain" buttons use blue text, the reality is that sometimes the buttons need another color. Since we use Tailwind CSS, it would be great if we could one of Tailwind's `text-color` helper functions to override the default and provide a custom color.

```html
<button class="button type-plain text-red">Click me!</button>
```

However, this led to a problem of [specificity](https://css-tricks.com/specifics-on-css-specificity/); The `text-red` selector has a specificity of **1** and the compound selector `.button.type-plain` has a specificity of **2**, so our button -- which should be red -- was actually blue!

The problem lies in the fact that we set `color` directly in a compound selector, which will have a higher specificity than any of our utilities. What if we could avoid setting `color` in the `.button.type-plain` selector? If _only_ `.button` defines the `color` property, then our utilities will be able to override it again[^1]!

The fix I found is to use a CSS variable to define the color to apply, and only actually set the `color` property from the `.button` selector.

```css
.button {
  --button-text-color: black;
  color: var(--button-text-color);
}

.button.type-plain {
  --button-text-color: blue;
}
```

Now, `.type-plain` will set the color _when `.button` is the class controlling the color_. If a utility like `text-red` is present, though, the `color` will still be overwritten to our desired value!

[^1]: This works as long as `.text-red` is defined _after_ `.button` in your stylesheet. When two selectors on an element have the same specificity, the latter definition is applied.
