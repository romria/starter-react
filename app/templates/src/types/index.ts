// eslint-disable-next-line  @typescript-eslint/no-explicit-any
interface Action<T = any> {
  type: T
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [extraProps: string]: any
}

export type EmptyObject = Record<PropertyKey, never>;
