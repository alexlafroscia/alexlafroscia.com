<script lang="ts">
  import "../../tailwind.css";

  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let { workExperiences, openSourceProjects } = data;
</script>

<svelte:head>
  <title>Resume for Alex LaFroscia</title>

  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<header
  class="w-readable max-w-full mx-auto px-4 sm:px-8 flex flex-col my-8 md:flex-row md:justify-between"
>
  <h1 class="text-3xl font-bold text-center md:text-left">Alex LaFroscia</h1>
  <div class="flex justify-center md:flex-col md:items-end">
    <a class="mr-4 text-right md:mr-0" href="/">alexlafroscia.com</a>
    <a class="md:text-right" href="mailto:alex@lafroscia.com"> alex@lafroscia.com </a>
  </div>
</header>

<section class="w-readable max-w-full mx-auto px-4 sm:px-8 mb-8 space-y-4">
  <header>
    <h1 class="text-xl font-bold text-center md:text-left">Work Experience</h1>
  </header>

  {#each workExperiences as work}
    <div class="items-center grid gap-x-4 gap-y-1 work-container">
      <h2 class="work-company font-bold">{work.company}</h2>
      <p class="work-role">{work.role}</p>
      <p class="work-time">{work.time}</p>
      <ul class="work-details list-disc ml-5 space-y-1">
        {#each work.details ?? [] as detail}
          <li class="work-detail">{detail}</li>
        {/each}
      </ul>
    </div>
  {/each}
</section>

<section class="w-readable max-w-full mx-auto px-4 sm:px-8 mb-8 space-y-4">
  <header>
    <h1 class="text-xl font-bold text-center md:text-left">Open Source</h1>
  </header>

  {#each openSourceProjects as project}
    <div>
      <h2><a class="font-bold" href={`https://github.com/${project.name}`}>{project.name}</a></h2>
      <ul class=" list-disc ml-5 space-y-1">
        {#each project.details as detail}
          <li>{detail}</li>
        {/each}
      </ul>
    </div>
  {/each}
</section>

<section class="w-readable max-w-full mx-auto px-4 sm:px-8 mb-8 space-y-4">
  <header>
    <h1 class="text-xl font-bold text-center md:text-left">Academics</h1>
  </header>
  <ul>
    <li>
      BS in Computed Science from University of Pittsburgh, College of Arts and Sciences, Class of
      2016.
    </li>
  </ul>
</section>

<style lang="postcss">
  @media print {
    :global(html) {
      font-size: 12px;
    }
  }

  .work-container {
    grid-template-areas:
      "name name name"
      "role role role"
      "time time time"
      "details details details";
    grid-template-columns: auto 1fr auto;

    @screen sm {
      grid-template-areas:
        "name name name"
        "role role time"
        "details details details";
    }

    @screen md {
      grid-template-areas:
        "name role time"
        "details details details";
    }
  }

  .work-company {
    grid-area: name;
  }

  .work-role {
    grid-area: role;
  }

  .work-time {
    grid-area: time;
  }

  .work-details {
    grid-area: details;
  }

  .work-detail :global(span) {
    @apply leading-5;
  }
</style>
