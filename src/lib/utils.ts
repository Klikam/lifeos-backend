export const omitUndefined = <T extends object>(
  obj: T,
): { [K in keyof T]: Exclude<T[K], undefined> } => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as { [K in keyof T]: Exclude<T[K], undefined> };
};
