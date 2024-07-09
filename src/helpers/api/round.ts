import Round, { RoundWithTime } from 'types/Round'
import axios from 'axios'
import env from 'helpers/env'

const backendEndpoint = env.VITE_BACKEND_URL + '/round'

export async function getTopWinOfTheDay(): Promise<RoundWithTime | null> {
  try {
    const { data } = await axios.get<RoundWithTime>(
      backendEndpoint + '/mostWin'
    )
    return data || null
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getPreviousWinner() {
  try {
    const { data } = await axios.get<Round>(`${backendEndpoint}/prevWinner`)
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getRoundHistory() {
  try {
    const { data } = await axios.get<Round[]>(`${backendEndpoint}/roundHistory`)
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}
