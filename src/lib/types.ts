import type { SvelteComponentDev } from "svelte/internal";

export type MaybePromise<T> = Promise<T> | T;

declare class MDsveXComponent extends SvelteComponentDev {
  render(): MDsveXModuleResult;
}

export type MDsveXModuleResult = {
  html: string;
};

export type MDsveXModule = {
  default: MDsveXComponent;
  metadata: Record<string, any>;
};
