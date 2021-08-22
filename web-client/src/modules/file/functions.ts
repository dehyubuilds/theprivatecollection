import filesize from 'filesize'
import { formatDistanceToNow, addMinutes } from 'date-fns'

import type { CustomFile } from './types'

import { generateUniqueId } from '@/utilities/generators'
import { getFileExtension } from '@/utilities/strings'

const ImageFiles = ['.jpg', '.jpeg', '.png']
const VideoFiles = ['.mp4', '.mov']

export function isImage(fileName: string) {
  const fileExtension: string = fileName.split('.').pop() as string
  if (ImageFiles.includes('.' + fileExtension)) {
    return true
  }
}
export function isVideo(fileName: string) {
  const fileExtension: string = fileName.split('.').pop() as string
  if (VideoFiles.includes('.' + fileExtension)) {
    return true
  }
}
export function getTimeToExpireFile(fileCreationDate: string) {
  const creationDate = new Date(fileCreationDate)
  const expireDate = addMinutes(creationDate, 30)
  const timeToExpire = formatDistanceToNow(expireDate)

  return timeToExpire
}

export function getCurrentISODate() {
  return new Date().toISOString()
}

export function parseFile(file: File): CustomFile {
  return {
    rawFile: file,
    id: generateUniqueId(),
    name: file.name,
    extension: getFileExtension(file.name),
    size: file.size,
    progress: 0,
    url: null,
    createdAt: getCurrentISODate(),
    isSettled: false,
    isUploaded: false,
    isUploadFailed: false,
    isUploadCanceled: false,
    isBiggerThanSizeLimit: false,
  }
}

export function getReadableSize(size: number) {
  const sizeFormatter = filesize.partial({ round: 0 })
  return sizeFormatter(size)
}
