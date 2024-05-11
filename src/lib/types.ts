import type { SvelteComponent } from "svelte";

export type MaybePromise<T> = Promise<T> | T;

export type MDsveXModuleResult = {
  html: string;
};

export type MDsveXModule = {
  default: typeof SvelteComponent;
  metadata: Record<string, any>;
};
