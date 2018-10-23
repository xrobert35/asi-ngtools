import extCloneDeep from 'clone-deep';

export function map(array: Array<any>, mapper: (value: any, index?: number) => any) {
  if (array) {
    return array.map(mapper);
  }
  return array;
}

export function filter(array: Array<any>, iteratee: (value: any, index?: number) => any) {
  if (array) {
    return array.filter(iteratee);
  }
  return array;
}

export function isArray(array: any): boolean {
  return Array.isArray(array);
}

export function times(howManyTimes: number, iteratee: (value?: any) => any) {
  const res = [];
  let index = 0;
  while (++index < howManyTimes) {
    res.push(iteratee(index));
  }
  return res;
}

export function forEach(array: Array<any>, iteratee: (value: any, index: number) => any) {
  if (array) {
    array.forEach(iteratee);
  }
}

export function remove(array: Array<any>, iteratee: (value: any, index: number) => any) {
  if (array) {
    let index = array.length;
    while (index--) {
      if (iteratee(array[index], index)) {
        array.splice(index, 1);
      }
    }
  }
}

export function removeAtIndex(array: Array<any>, index: number) {
  if (array) {
    array.splice(index, 1);
  }
}

export function get(object: any, path: any, defaultVal?: any): any {
  const _path = Array.isArray(path)
    ? path
    : path.split('.').filter( (index: any) => index.length)

  if (!_path.length) {
    return object === undefined ? defaultVal : object
  }

  return get(object[_path.shift()], _path, defaultVal);
}

export function find(array: Array<any>, finder: (value: any, index: number, obj: any[]) => boolean) {
  if (array) {
    return array.find(finder);
  }
  return undefined;
}

export function truncate(value: string, maxLength: number) {
  if (value) {
    return value.substring(0, maxLength)
  }
  return value;
}

export function indexOf(items: any, what: any) {
  if (items) {
    return items.indexOf(what);
  }
  return -1;
}

export function concat(...arrays: any[]) {
  let newArray: Array<any> = [];
  arrays.forEach((array) => {
    newArray = newArray.concat(array);
  });
  return newArray;
}

export function replace(str: string, reg: RegExp, newVal: string) {
  if (str) {
    return str.replace(reg, newVal);
  }
  return str;
}

export function orderBy(array: Array<any>, key: string, asc: 'asc' | 'desc') {
  const order = asc === 'asc' ? -1 : 1;
  array.sort((a, b) => {
    if (a[key] < b[key]) {
      return order;
    } else if (a[key] > b[key]) {
      return -order;
    }
    return 0;
  });
  return array;
}

export function cloneDeep(object: any) {
  return extCloneDeep(object);
}

export function isEmpty(item: any) {
  return !item || item.length === 0
}

export function join(items: Array<any>, separator: string) {
  if (items) {
    return items.join(separator);
  }
  return items;
}
