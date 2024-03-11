const startIndex = 176

const padNumber = (num: number, size: number, prefix: string) => {
  return num.toString().padStart(size, prefix)
}
export const dicomImageIds = Array(10)
  .fill(0)
  .map((_, i) => {
    const paddedIndex = padNumber(startIndex + i, 6, '0')
    return `wadouri:/dicom/image-${paddedIndex}.dcm`
  })
