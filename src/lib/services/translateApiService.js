export async function translateText(text) {
  if (!text) {
    throw new Error('Text is equired')
  }

  const translateApiKey = process.env.DEEPL_API_KEY
  const url = 'https://api-free.deepl.com/v2/translate'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${translateApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        source_lang: 'EN',
        target_lang: 'SV',
      }),
    })

    const data = await response.json()
    if (data.translations && data.translations.length > 0) {
      return data.translations[0].text
    }
    throw new Error('Translation failed')
  } catch (error) {
    throw new Error('Failed to translate text: ' + error.message)
  }
}

export async function translatePlot(plot) {
  return await translateText(plot)
}
