export async function promiseGuard<T>(promise: Promise<T>): Promise<[any, T?]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, undefined];
  }
}
