export const convertErrorsFormat = errorList => {
  const errorsObject = {}
  const indexes = [...new Set(errorList.map(err => err.path))]

  for (let index of indexes) {
    errorsObject[index] = errorList.find(err => err.path).message
  }

  return errorsObject
}
