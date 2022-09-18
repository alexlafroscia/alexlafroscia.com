import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

import { requestId } from "./hooks/requestId";
import { handle as setVercelHeaders } from "./hooks/vercel";

export const handle: Handle = sequence(requestId, setVercelHeaders);
