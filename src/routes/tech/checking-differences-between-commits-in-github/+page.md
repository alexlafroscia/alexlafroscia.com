---
title: Checking Differences Between Commits in Github
date: 2017-12-20T08:07:52.708Z
description: >-
  Chances are you've used software that is stored on Github. if you've ever
  wanted to check the differences between two commits, here's how to do it.
tags:
  - git
  - github
legacy: true
---

Changes are you use some dependencies that have their source code hosted on Github. It's useful to be able to check the differences between two commits to see what has changed, especially when determining what breaking changes there might be between two releases. `git` of course has this functionality, but accessing it through the Github UI is much more convenient. I couldn't find a nice way to access this feature, though, so I started to do a little digging.

It turns out that it's actually really easy to create the URL for viewing the differences yourself. For any given project, you can go to the URL that looks like:

```txt
https://github.com/__NAMESPACE__/__PROJECT__/compare/__EARLIER_COMMIT__...__LATER_COMMIT__
```

to see all of the changes between those two commits. So for example, you could go here:

[https://github.com/alexlafroscia/til-blog/compare/3c7ae8...99b062](https://github.com/alexlafroscia/til-blog/compare/3c7ae8...99b062)

to view the most recent change to this blog (at the time of writing).

This works with any commit identier, including branch names and tags (which is great for comparing releases). So, you could go here:

[https://github.com/alexlafroscia/til-blog/compare/3c7ae8...master](https://github.com/alexlafroscia/til-blog/compare/3c7ae8...master)

to view _all_ of the changes between the most recent commit and the current published version.
