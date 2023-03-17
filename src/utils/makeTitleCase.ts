export default function makeTitleCase(value: string): string {
  return value[0].toUpperCase() + value.slice(1, value.length);
}
