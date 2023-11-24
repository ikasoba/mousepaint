import { Context } from "preact";
import { useContext, useEffect, useMemo } from "preact/hooks";

export const createProxy = <T extends object>(target: { value: T }): T => {
  return new Proxy({} as T, {
    has(_, p) {
      return p in target.value;
    },
    get(_, key) {
      const value = target.value[key as keyof T];
      if (typeof value !== "object") return value;

      return createProxy({
        get value() {
          return target.value[key as keyof T] as object;
        },
      });
    },
    ownKeys() {
      return Reflect.ownKeys(target.value);
    },
    getOwnPropertyDescriptor(_, p) {
      return Reflect.getOwnPropertyDescriptor(target.value, p);
    },
  });
};

export const useContextProxy = <T extends object>(ctx: Context<T>): T => {
  const value = useContext(ctx);
  const target = useMemo<{ value: T }>(() => ({ value }), []);
  const proxy = createProxy(target);

  useEffect(() => {
    target.value = value;
  }, [value]);

  return proxy;
};
