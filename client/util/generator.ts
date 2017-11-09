export function* flatMapIterable (fn: Function, iterable: any) {
  for (const value of iterable) {
    yield *fn(value)
  }
}

export function* mapIterable (fn: Function, iterable: any) {
  console.log(iterable, 'any more ')
  for (const value of iterable) {
    yield fn(value)
  }
}

export function* untilIterable (n: number, iterable: any) {
  let count = n

  for (const value of iterable) {
    if (count-- <= 0) {
      break
    }

    yield value
  }
}

export function* filterIterable (fn: Function, iterable: any) {
  for (const value of iterable) {
    if (fn(value)) {
      yield value
    } else {
      continue
    }
  }
}
