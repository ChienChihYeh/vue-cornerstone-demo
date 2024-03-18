import { dicomTagSet } from '@/configs/dicomTagSetConfig'
export function displayDicomTags(data: Record<string, any>) {
  // https://www.dicomlibrary.com/dicom/dicom-tags/

  for (const tag of dicomTagSet) {
    console.log(tag[0] + ':', parseTag(data, tag[1]))
  }
}

function parseTag(data: Record<string, any>, tag: string) {
  return data.string(tag)
}
