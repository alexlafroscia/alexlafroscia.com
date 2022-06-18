import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

import { requestId } from "./requestId";
import { handle as setVercelHeaders } from "./vercel";

export const handle: Handle = sequence(requestId, setVercelHeaders);
