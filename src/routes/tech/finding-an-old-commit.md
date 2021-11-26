---
title: Finding an Old Commit
date: 2016-10-18T14:30:54-07:00
description: A tip about finding a git commit based on information in the message
tags:
  - git
legacy: true
---

If you end up in a situation where you want to grab an old commit (from some other branch, even) but don’t know the commit hash, you want to access the `reflog`. It allows you to access old commits easily:

```bash
git reflog | head -200 | grep TMP
```

Will show info on all the commits within the last 200 that has a message containing `TMP`. This is really useful if you’re using some temporary hack that you want to apply/remove repeatedly without keeping it in a branch.
