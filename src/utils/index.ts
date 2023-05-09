export const getBem = (block: string) => {
  return (name: string) => {
    return `cf-${block}-${name}`
  }
}
