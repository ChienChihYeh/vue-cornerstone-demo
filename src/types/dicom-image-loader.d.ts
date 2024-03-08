//minimal type definitions for @cornerstonejs/dicom-image-loader

interface LoaderDecodeOptions {
  convertFloatPixelDataToInt?: boolean
  use16BitDataType?: boolean
}

interface LoaderXhrRequestParams {
  url?: string
  deferred?: {
    resolve: (value: ArrayBuffer | PromiseLike<ArrayBuffer>) => void
    reject: (reason?: any) => void
  }
  imageId?: string
}

interface LoaderXhrRequestError extends Error {
  request: XMLHttpRequest
  response: any
  status: number
}

declare module '@cornerstonejs/dicom-image-loader' {
  import * as cornerstone from '@cornerstonejs/core'
  import dicomParser from 'dicom-parser'

  interface External {
    cornerstone: typeof cornerstone
    dicomParser: typeof dicomParser
  }

  interface DICOMImageLoader {
    configure(options: {
      beforeSend?: (
        xhr: XMLHttpRequest,
        imageId: string,
        defaultHeaders: Record<string, string>,
        params: LoaderXhrRequestParams
      ) => Record<string, string> | void
      decodeConfig?: LoaderDecodeOptions
      errorInterceptor?: (error: LoaderXhrRequestError) => void
    }): void
    external: External
  }

  const cornerstoneDICOMImageLoader: DICOMImageLoader
  export default cornerstoneDICOMImageLoader
}
