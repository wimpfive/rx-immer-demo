type AnyUnaryFunction = (p: any) => any;

type FirstFunctionParameterType<T extends AnyUnaryFunction[]> = T extends [
  (p: infer P) => any,
  ...unknown[]
]
  ? P
  : never;

type LastFunctionReturnType<T extends AnyUnaryFunction[]> = T extends [
  ...unknown[],
  (p: any) => infer R,
]
  ? R
  : never;

export function compose<T extends AnyUnaryFunction[]>(
  ...fns: T
): (p: FirstFunctionParameterType<T>) => LastFunctionReturnType<T> {
  return fns.reduce(
    (p, c) => (v) => c(p(v)),
    (v) => v,
  );
}
