// based on https://github.com/cornerstonejs/cornerstone3D/blob/main/packages/core/examples/webLoader/registerWebImageLoader.ts
// you can also encapsulate this loader in a hook
import * as cornerstone from '@cornerstonejs/core'
const canvas = document.createElement('canvas')
let lastImageIdDrawn: string | undefined

function createImage(image: HTMLImageElement, imageId: string) {
  // extract the attributes we need
  const rows = image.naturalHeight
  const columns = image.naturalWidth

  function getPixelData(targetBuffer: {
    arrayBuffer: ArrayBufferLike
    offset: number | undefined
    length: number | undefined
  }) {
    const imageData = getImageData()

    if (!imageData) return

    let targetArray

    // Check if targetBuffer is provided for volume viewports
    if (targetBuffer) {
      targetArray = new Uint8Array(
        targetBuffer.arrayBuffer,
        targetBuffer.offset,
        targetBuffer.length
      )
    } else {
      targetArray = new Uint8Array(imageData.width * imageData.height * 3)
    }

    // modify original image data and remove alpha channel (RGBA to RGB)
    convertImageDataToRGB(imageData, targetArray)

    return targetArray
  }

  function convertImageDataToRGB(
    imageData: ImageData | undefined,
    targetArray: any[] | Uint8Array
  ) {
    if (!imageData) return
    for (let i = 0, j = 0; i < imageData.data.length; i += 4, j += 3) {
      targetArray[j] = imageData.data[i]
      targetArray[j + 1] = imageData.data[i + 1]
      targetArray[j + 2] = imageData.data[i + 2]
    }
  }

  function getImageData() {
    let context

    if (lastImageIdDrawn === imageId) {
      context = canvas.getContext('2d', { willReadFrequently: true })
    } else {
      canvas.height = image.naturalHeight
      canvas.width = image.naturalWidth
      context = canvas.getContext('2d', { willReadFrequently: true })
      if (context) context.drawImage(image, 0, 0)
      lastImageIdDrawn = imageId
    }
    if (context) {
      return context.getImageData(0, 0, image.naturalWidth, image.naturalHeight)
    }
  }

  function getCanvas() {
    if (lastImageIdDrawn === imageId) {
      return canvas
    }

    canvas.height = image.naturalHeight
    canvas.width = image.naturalWidth
    const context = canvas.getContext('2d')

    if (context) context.drawImage(image, 0, 0)
    lastImageIdDrawn = imageId

    return canvas
  }

  // Extract the various attributes we need
  return {
    imageId,
    minPixelValue: 0,
    maxPixelValue: 255,
    slope: 1,
    intercept: 0,
    windowCenter: 128,
    windowWidth: 255,
    getPixelData,
    getCanvas,
    getImage: () => image,
    getImageData,
    rows,
    columns,
    height: rows,
    width: columns,
    color: true,
    // we converted the canvas rgba already to rgb above
    rgba: false,
    columnPixelSpacing: 1, // for web it's always 1
    rowPixelSpacing: 1, // for web it's always 1
    invert: false,
    sizeInBytes: rows * columns * 3
  }
}

function arrayBufferToImage(arrayBuffer: Iterable<number>) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const arrayBufferView = new Uint8Array(arrayBuffer)
    const blob = new Blob([arrayBufferView])
    const urlCreator = window.URL || window.webkitURL
    const imageUrl = urlCreator.createObjectURL(blob)

    image.src = imageUrl
    image.onload = () => {
      resolve(image)
      urlCreator.revokeObjectURL(imageUrl)
    }

    image.onerror = (error) => {
      urlCreator.revokeObjectURL(imageUrl)
      reject(error)
    }
  })
}

function loadImage(uri: string, imageId: string) {
  const xhr = new XMLHttpRequest()

  console.log(uri, imageId)

  xhr.open('GET', uri, true)
  xhr.responseType = 'arraybuffer'
  // options.beforeSend(xhr)

  xhr.onprogress = function (oProgress) {
    if (oProgress.lengthComputable) {
      // evt.loaded the bytes browser receive
      // evt.total the total bytes set by the header
      const loaded = oProgress.loaded
      const total = oProgress.total
      const percentComplete = Math.round((loaded / total) * 100)

      const eventDetail = {
        imageId,
        loaded,
        total,
        percentComplete
      }

      cornerstone.triggerEvent(cornerstone.eventTarget, 'cornerstoneimageloadprogress', eventDetail)
    }
  }

  const promise = new Promise((resolve, reject) => {
    xhr.onload = function () {
      const imagePromise = arrayBufferToImage(this.response)

      imagePromise
        .then((image) => {
          const imageObject = createImage(image as HTMLImageElement, imageId)

          resolve(imageObject)
        }, reject)
        .catch((error) => {
          console.error(error)
        })
    }
    xhr.onerror = function (error) {
      reject(error)
    }
    xhr.send()
  })

  const cancelFn = () => {
    xhr.abort()
  }

  return {
    promise,
    cancelFn
  }
}

function _loadImageIntoBuffer(
  imageId: string,
  options?: Record<string, any>
): { promise: Promise<Record<string, any>> } {
  const promise = new Promise<Record<string, any>>((resolve, reject) => {
    const protocol = window.location.protocol
    const uri = imageId.replace(protocol, '')

    // get the pixel data from the server
    loadImage(uri, imageId)
      .promise.then(
        (image) => {
          if (
            !options ||
            !options.targetBuffer ||
            !options.targetBuffer.length ||
            !options.targetBuffer.offset
          ) {
            resolve(image as PromiseLike<Record<string, any>>)
            return
          }
          // image.getPixelData(options.targetBuffer)
          // resolve(true)
        },
        (error) => {
          reject(error)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })

  return {
    promise
  }
}

export function registerWebImageLoader(imageLoader: typeof cornerstone.imageLoader): void {
  imageLoader.registerImageLoader('http', _loadImageIntoBuffer)
}
