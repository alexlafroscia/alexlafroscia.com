---
title: Making a Custom Obsidian Bases View
date: 2025-10-10T14:00Z
description: >-
  Obsidian is on the brink of allowing developers to write their own custom views. Let's get familiar with the API by building a basic custom view together.
tags:
  - Obsidian
  - Obsidian Plugin
  - Obsidian Bases
---

<script context="module">
  import { assets } from '$app/paths';

  const assetPath = `${assets}/tech/2025/making-a-custom-obsidian-bases-view`
</script>

After months of development, [Obsidian][obsidian] recently released support for [Bases][obsidian-bases], a core plugin that allows you to create different kinds of visualizations of the files within your Obsidian vault. While it comes with built-in support for common use-cases like viewing a list of files as a table, the upcoming `1.10` release of Obsidian will allow plugin authors to create their own custom views. This can be used to display your notes in any way that you can imagine, like a map, a Kanban board, or a calendar.

Currently, there is no published documentation for the Bases View API; the feature is still in early access, and I am sure that documentation will be published in due time. That said, I've been excited about the prospect of custom Bases views since starting to use the feature over the summer, so I dug into the one place that you can see the API in action: the official [`obsidian-maps`][obsidian-maps] plugin that will be available alongside the `1.10` release.

This post will dig into the basics of the Bases View API, and walk through building a simple calendar view that can display your notes as events on a calendar!

## The Basics of the API

Before digging into building a plugin together, let's talk about the basics of how we can implement a custom Bases view. The custom view API is based around the newly-provided `BasesView` class, which can be implemented by a plugin to take the results of a Bases query and render it. There are two main components to this class's API that are worth knowing about up front:

1. The `data` property of the class will be populated with the results of the Base's query, providing the data about the files that match the filter and the values of the configured properties.
2. The `onDataUpdated` method of the class is called when `data` is populated, as well as any time the underlying results are updated (such as changing the filters applied to the view).

We'll see these two concepts come up again once we're implementing our plugin!

## Building a Custom Bases View

Now that we've covered the two most important parts of the `BasesView` API, let's build a "calendar" plugin together to see how it works. There are a few things that you'll need to get set up if you want to follow along:

1. Access to Obsidian 1.10 through the [Early Access program][catalyst]; this is required for your version of Obsidian to allow for custom Bases views.
2. Follow the official ["Build a Plugin" guide](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin) through step 4 to set up a fresh plugin for development. We'll pick up with step 5 together, where we'll author the custom view! Make sure to read over the suggestions on how to build and reload the plugin within Obsidian after making any changes to the plugin's source code.
3. Add a couple of files to your development vault and a Base that can render our custom view. I created a few daily notes within a `Daily/` directory, and then defined my Base using the following configuration:

```yaml
filters:
  and:
    - file.folder == "Daily"
formulas:
  date: date(file.name)
```

Before we define our Bases view, there's one other thing you'll need: a way to render a calendar. Let's grab the [FullCalendar][fullcalendar] package, just to give us a component that's well-documented and easy to integrate with:

```bash
npm install \
  @fullcalendar/core \
  @fullcalendar/daygrid \
  @fullcalendar/timegrid \
  @fullcalendar/list
```

With those packages installed, we can start actually defining our custom Bases view!

### Rendering the Calendar

To start, we can render the calendar inside of the Bases view; once that's in place, we'll populate it with data and add some interactivity. Our `BasesView` subclass will take care of rendering the FullCalendar component when the "Calendar" layout is selected for a Bases view.

Follow along in the comments of the code snippet below for an explanation of the important parts!

```ts
import { BasesView, QueryController, Plugin } from "obsidian";

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default class CalendarViewPlugin extends Plugin {
  async onload() {
    // The `registerBasesView` API is how the Obsidian plugin defines custom views.
    // The `name` and `icon` properties are used in the view selector, and `factory` is called
    // to actually populate the view
    this.registerBasesView("calendar", {
      name: "Calendar",
      icon: "calendar",
      factory: (controller, containerEl) => new CalendarView(controller, containerEl),
    });
  }
}

class CalendarView extends BasesView {
  /**
   * All `BasesView` subclasses need to have a bespoke `type` property that identifies them
   */
  type = "CalendarView";

  private calendar: Calendar;

  /**
   * Our `BasesView` sublass receives it's constructor arguments from the `factory` function provided
   * when registering the custom view
   *
   * The `QueryController` manages the data being provided to the view by Obsidian. Our plugin does
   * not need to interact with it directly; the parent class's own behavior will use this to populate
   * the `data` property we discussed earlier
   *
   * The `HTMLElement` serves as the root element for the view, which we can render our FullCalendar
   * component into
   */
  constructor(controller: QueryController, containerEl: HTMLElement) {
    super(controller);

    // Standard basic `Calendar` setup, from the FullCalendar documentation
    this.calendar = new Calendar(containerEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      },
    });
  }

  /**
   * The `unload` method is common to all Obsidian view plugins, not just those related to Bases; we
   * can use this to clean up anything that we created by the view (like the calendar instance)
   */
  unload(): void {
    this.calendar.destroy();
  }
}
```

With that in place, you should be able to select `Calendar` as the layout type for your view to see a fully interactive calendar UI that we can populate with events.

![Selecting the Calendar layout for the Base]({assetPath}/select-calendar-as-layout-type.png)

### Receiving Data from the Base

Now that we have our calendar rendered, we'll want to add some events. FullCalendar makes this fairly easy through the ability to define a function that can provide this data to the UI component; this can be used to translate the data we receive from Obsidian into the data we send to the calendar.

Let's look at how our `CalendarView` class can be updated to render this data. Note that ellipses (`...`) are used to pass over parts of the previous code example that are unchanged, so we can focus on the additions.

```typescript
class CalendarView extends BasesView {
  ...

  constructor(controller: QueryController, containerEl: HTMLElement) {
    super(controller);

    this.calendar = new Calendar(containerEl, {
      ...
      events: () => this.makeEventsFromData()
    });
  }

  async makeEventsFromData() {
    // The `data` property, which provides our view with access to the data retreived
    // by the Base, won't exist initially; we want to exit early in that case
    if (!this.data?.data) {
      return [];
    }

    // `data.data` reflects the actual query results that the Base provides to our view
    return this.data.data.map((entry) => {
      // The `date` formula that we defined in our Base will be used to define where each note
      // is rendered in the calendar
      const start = entry.getValue("formula.date");

      // The object returned here defines how FullCalendar will render the event
      return {
        id: entry.file.path,
        title: entry.file.basename,
        start: start.date.toISOString(),
        allDay: true,
      };
    });
  }

  // `onDataUpdated` is called automatically by Obsidian when the `data` property changes
  onDataUpdated(): void {
    // Calling `refetchEvents` on the calendar instance tells FullCalendar to call the `events`
    // function again, which regenerates the list of events from our `data` property
    this.calendar.refetchEvents();
    // Calling `render` tells the FullCalendar UI to update after it finishes refetching
    this.calendar.render();
  }

  ...
}
```

With these additions in place, the `data` property of our Bases view now serves as the event source for the FullCalendar component. The calendar will automatically reflect any changes to the underlying data in real time as well; you can test this out by applying an additional filter to the base, which will be immediately reflected in the visible calendar events.

![Bases results displayed as calendar events]({assetPath}/displaying-events-on-the-calendar.png)

### Opening Notes from the Calendar

While viewing the notes on the calendar is neat, it's not exactly useful if we can't click on an event to open the associated note. Let's hook up some basic interactivity so that our calendar view is much more functional!

```typescript
class CalendarView extends BasesView {
  ...

  constructor(controller: QueryController, containerEl: HTMLElement) {
    ...

    this.calendar.on("eventClick", ({ event }) => {
      const { id } = event;

      this.app.workspace.openLinkText(id, "");
    });
  }
}
```

Adding this `eventClick` handler to our FullCalendar instance is all we need to allow notes to be opened from the calendar! The `id` property of each event, which we defined based on the full path of each rendered file, can be reused with Obsidian's plugin API for opening a note to handle the behavior we'd expect to see.

![Clicking on a calendar event to open the associated note]({assetPath}/event-interactivity.gif)

## Further Reading

This tutorial aimed to serve as an overview of the most fundamental aspects of the Obsidian Bases View API, and there is more to explore if you want a deeper knowledge of what a custom Bases View can do. If you're looking for a little more information, I suggest checking out the [`obsidian-maps`][obsidian-maps] plugin by the Obsidian team. You can also find a repo containing my initial, slightly more complex (and featureful) version of the code in this tutorial [here][calendar-view-repo].

[obsidian]: https://obsidian.md
[obsidian-bases]: https://help.obsidian.md/bases
[obsidian-maps]: https://github.com/obsidianmd/obsidian-maps
[fullcalendar]: https://fullcalendar.io
[catalyst]: https://help.obsidian.md/early-access
[calendar-view-repo]: https://github.com/alexlafroscia/obsidian-calendar-bases-view
