export const getFilteredImage = (imageSrc: string, filter: string): Promise<string> => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas 2D context')
  }

  const image = new Image()

  image.src = imageSrc

  return new Promise((resolve, reject) => {
    image.onload = () => {
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight

      ctx.filter = filter
      ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
      )

      canvas.toBlob(blob => {
        if (blob) {
          resolve(URL.createObjectURL(blob))
        } else {
          reject(new Error('Failed to create blob from canvas'))
        }
      }, 'image/jpeg')
    }

    image.onerror = () => {
      reject(new Error('Failed to load image for cropping'))
    }
  })
}
