export const identity = (i: any) => i // sketch

export const safeCurry = (unaryFn: any, option: object = {}) =>
  (arg: any) => typeof unaryFn === 'function' ?
    unaryFn(arg) :
      Object.assign(safeCurry(identity), option) // do this so option doesn't get assigned to identity directly

export const unaryCompose = (...fns: any[]) =>
  fns.reduce(
    (a: Function = identity, b: Function = identity) => (arg: any) => a(b(arg)), identity
  )

export const createTree = (left: Function, right: Function) =>
  (condition: boolean) => condition ?
    right():
    left()

