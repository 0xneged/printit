import { atomWithStorage } from 'jotai/utils'

const printerTimeoutAtom = atomWithStorage<number | undefined>(
  'printerTimeout',
  undefined,
  undefined,
  {
    getOnInit: true,
  }
)

export default printerTimeoutAtom
