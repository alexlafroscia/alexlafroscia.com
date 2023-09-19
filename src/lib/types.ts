import type { SvelteComponent } from "svelte";

export type MaybePromise<T> = Promise<T> | T;

declare class MDsveXComponent extends SvelteComponent {
  render(): MDsveXModuleResult;
}

export type MDsveXModuleResult = {
  html: string;
};

export type MDsveXModule = {
  default: MDsveXComponent;
  metadata: Record<string, any>;
};
