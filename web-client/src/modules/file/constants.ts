import { getReadableSize } from '@/modules/file'

export const FILE_MAX_SIZE = 300000000 // 300 MB

export const FILE_MAX_SIZE_FORMATTED = getReadableSize(FILE_MAX_SIZE).toLowerCase().replace(' ', '')
