import { getReadableSize } from '@/modules/file'

export const FILE_MAX_SIZE = 1073741274 // 1GB

export const FILE_MAX_SIZE_FORMATTED = getReadableSize(FILE_MAX_SIZE).toLowerCase().replace(' ', '')
