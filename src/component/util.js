export const id = () =>
  `_${(
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36)}`

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
