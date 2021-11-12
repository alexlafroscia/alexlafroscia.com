# `mdsevx` with SvelteKit

I have been looking for a new platform to author my blog and personal site lately, and SvelteKit has been really
catching my eye. I currently use Gatsby.js, but shipping all of React and dealing with it's whole GraphQL abstraction
layer, while powerful, feels overkill for what should be more-or-less a static website. Ideally I just want

1. Pre-rendered pages
2. Small assets
3. Easy way to add interactivity, when it's needed

Coming from Gatsby, SvelteKit is delivering on these goals: `.svelte` files, feel mostly like a
template file I can just put content into, adding in styling or interactivity as needed. Using React components for each
page, as Gatsby would, feels like bringing in _all_ the power of JavaScript and then just using it to produce page
content that will never change.
