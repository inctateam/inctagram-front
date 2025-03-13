export const getCroppedImage = (
  imageSrc: string,
  pixelCrop: { height: number; width: number; x: number; y: number }
): Promise<string> => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas 2D context')
  }

  const image = new Image()

  image.src = imageSrc

  return new Promise((resolve, reject) => {
    image.onload = () => {
      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
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
