---
title: Fixing $PATH changes in tmux
date: 2016-10-18T14:00:54-07:00
description: Fixing unwanted changed to $PATH in tmux
topics:
    - tmux
    - zsh
legacy: true
---

I noticed that my `$PATH` was being set differently between `tmux` and a regular shell. Specifically, without `tmux` my Ruby installation from [`asdf`](https://github.com/asdf-vm/asdf) would override the default one but in `tmux` it would not.

Eventually, I was tipped off by [this blog post](http://www.softec.lu/site/DevelopersCorner/MasteringThePathHelper) that the issue might be my `/etc/zprofile` file, and that was indeed the case; changing the code to this fixed it for me:

```zsh
if [ -x /usr/libexec/path_helper ]; then
	PATH=""
	eval `/usr/libexec/path_helper -s`
fi
```

Now, the directories that I want on the front of `$PATH` are consistently placed there.
