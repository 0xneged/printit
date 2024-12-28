import axios from 'axios'
import checkAuthToken from 'helpers/api/checkAuthToken'
import env from 'helpers/env'

export async function castPicture(file: File) {
  const { headers } = await checkAuthToken()

  const formData = new FormData()
  formData.append('picture', file)

  const { data } = await axios.post<{ castHash: string; timeout: number }>(
    `${env.VITE_BACKEND_URL}/cast/pic`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    }
  )
  return data
}

export async function getPictureTimeout() {
  const { headers } = await checkAuthToken()

  const { data } = await axios.get<{ timeout: number }>(
    `${env.VITE_BACKEND_URL}/cast/pic/timeout`,
    { headers }
  )
  return data
}
