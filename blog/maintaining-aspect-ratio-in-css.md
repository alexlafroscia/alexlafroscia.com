---
templateKey: blog-post
path: /maintaining-aspect-ratio-in-css
title: Maintaining aspect ratio in CSS
date: 2017-07-19T16:00:35-07:00
description: >-
  How to create a CSS shape that maintains its aspect ratio, and a "gotcha"
  round doing so with Flexbox.
tags:
  - css
  - flexbox
---
I had to use a bit of a hack this week to ensure that a box always appeared at a 1:1 aspect ratio. Basically, by doing something like:

```css
.box {
  width: 100%;
  padding-top: 100%;
}
```
You can force something to display with the same height and width, since the padding percentage is relative to the width.

However, this _is not_ true of flex children, which this box happened to be. Chrome rendered just fine, but FireFox had different behavior, as documented [here](https://bugzilla.mozilla.org/show_bug.cgi?id=958714#c3) (the FireFox behavior might actually be more correct, I have no idea). Flex childrens’ percentage-padding is relative to the flex-parent.
