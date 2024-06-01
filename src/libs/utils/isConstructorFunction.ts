export function isConstructorFunction(obj: any): obj is new (...args: any[]) => any {
  return !!obj && typeof obj === 'function' && !!obj.prototype;
}