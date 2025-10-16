---
title: Generate an Ember app with the Module Unification layout
date: 2018-03-14T07:06:10+08:00
description: How to generate a new Ember app with Module Unification in one line of code
topics:
    - ember
legacy: true
---

Today at EmberConf, [Matthew Beale](https://twitter.com/mixonic) spoke about the new [Module Unification directory layout](https://github.com/emberjs/rfcs/pull/143) that will be coming to Ember in the near future. If you want to try it out now, you can install the `canary` version of the Ember CLI and generate a new application.

Thanks to [`npx`](https://github.com/zkat/npx), you can do this with a single command:

```bash
MODULE_UNIFICATION=true npx ember-cli/ember-cli new __name_of_app__
```

This avoids needing to globally install the `canary` version of the Ember CLI but still gives you access to the bleeding-edge features.

**Protip:** If you want to use `yarn`, throw `--yarn` on the end of that command.
