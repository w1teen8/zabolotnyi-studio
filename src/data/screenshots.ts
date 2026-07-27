const modules = import.meta.glob('../assets/projects/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const screenshots: Record<string, string> = {};

for (const path in modules) {
  const id = path.match(/([^/]+)\.jpg$/)?.[1];
  if (id) screenshots[id] = modules[path];
}
