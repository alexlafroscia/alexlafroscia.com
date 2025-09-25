interface Slug {
    path: string;
    label: string;
}

export function generateSlugs(path: string): Slug[] {
    const normalizedPath = path.replace(/\/$/, "");

    if (normalizedPath === "") {
        return [];
    }

    const segments = normalizedPath.split("/");

    return segments.map((segment, index) => {
        return {
            path: segments.slice(0, index + 1).join("/"),
            label: segment,
        };
    });
}
