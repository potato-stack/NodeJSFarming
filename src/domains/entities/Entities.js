export class Entities {
  value() {
    {
      return Object.fromEntries(Object.entries(this).map(([key, val]) => [key, val?.value ?? val]));
    }
  };
}
