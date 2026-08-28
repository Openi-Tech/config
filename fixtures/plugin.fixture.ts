// oxlint-disable-next-line openi/no-classes
class Nope {
  id = 1
}

const load = async (on: boolean, fetchAll: () => Promise<number[]>) =>
  // oxlint-disable-next-line openi/no-conditional-await-fallback
  on ? await fetchAll() : []

export { Nope, load }

class DomainError extends Error {}

export { DomainError }
