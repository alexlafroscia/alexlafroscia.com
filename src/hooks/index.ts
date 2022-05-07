import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

import { requestId } from "./requestId";

export const handle: Handle = sequence(requestId);
