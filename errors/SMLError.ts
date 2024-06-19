type SMLErrorSource = "controller" | "model" | "unknown"

type SMLErrorInput = {
  message: string
}

export default class SMLError extends Error {
  message: string

  constructor(input: SMLErrorInput) {
    super(input.message)
    this.message = input.message
  }
}
