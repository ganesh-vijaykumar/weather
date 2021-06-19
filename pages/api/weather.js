import fetch from 'node-fetch'

export default async (req, res) => {
  if (req.method === 'POST') {
    let URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${req.body}&aqi=no`
    let data
    try {
      const response = await fetch(URL)
      data = await response.json()
    } catch (error) {
      console.error(error)
    }
    if ('error' in data) {
      return res.status(200).json({ data: 'error' })
    }
    return res.status(200).json({ data })
  } else {
    return res.status(200).send('running')
  }
}
