import { existsSync } from "fs";
import { join, parse } from "path";

export function findPkg(location: string): string {
  const { dir } = parse(location);

  // BASE CASE: We reached the file-system root without locating the file
  if (dir === "/") {
    throw new Error("Could not locate a `package.json`");
  }

  const pkgPath = join(dir, "package.json");

  // If the file exists, return the path
  if (existsSync(pkgPath)) {
    return pkgPath;
  }

  // Otherwise, recurse upward
  return findPkg(dir);
}
