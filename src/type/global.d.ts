/**
 * https://segmentfault.com/q/1010000016173914
 * https://juejin.cn/post/6898710177969602574
 * https://jkchao.github.io/typescript-book-chinese/project/modules.html#import-require-%E4%BB%85%E4%BB%85%E6%98%AF%E5%AF%BC%E5%85%A5%E7%B1%BB%E5%9E%8B
 * not use declare global
 */
import { DEFAULT } from '@/constant'

declare global {
  type StringDefault = typeof DEFAULT | Extract<string, 'DEFAULT'>

  type AlignType = 'start' | 'end'

  type DirectionType = 'left' | 'right' | 'bottom' | 'top'

  type Id = string | number
}

export {}
