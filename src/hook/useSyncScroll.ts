import { useCallback, useRef } from 'react'

/**
 * 同步多个可滚动面板的滚动位置，鼠标悬停的面板作为同步发起者。
 *
 * 返回的 ref 回调需要挂载到每个面板上，同一个回调可被多个元素共享：
 *
 *   const bindPanel = useSyncScroll()
 *   <div ref={bindPanel} />
 *   <div ref={bindPanel} />
 *
 * 面板挂载/卸载的登记与事件绑定/解绑都由 React 在 commit 阶段驱动
 * （callback ref + React 19 cleanup），因此天然支持条件渲染、异步加载等
 * 延迟挂载场景，也无需维护 effect 依赖数组。
 *
 * 注意：若面板还需同时绑定其它 ref，请使用支持 React 19 ref cleanup
 * 的合并函数，否则卸载时无法调用本回调返回的清理函数。
 */
const useSyncScroll = () => {
  // 当前鼠标悬停、作为同步“发起者”的面板
  const currentScrollRef = useRef<HTMLElement | null>(null)
  // 已登记的所有面板
  const panelsRef = useRef<Set<HTMLElement>>(new Set())

  const onMouseEnter = useCallback((e: MouseEvent) => {
    currentScrollRef.current = e.currentTarget as HTMLElement
  }, [])

  const onMouseLeave = useCallback(() => {
    currentScrollRef.current = null
  }, [])

  const onScroll = useCallback((e: Event) => {
    const el = e.currentTarget as HTMLElement
    // 只有鼠标悬停的面板才能作为同步“发起者”，避免互相触发形成死循环
    if (currentScrollRef.current !== el) return

    const scrollableDistance = el.scrollHeight - el.clientHeight
    if (scrollableDistance <= 0) return // 面板自身不可滚动，无需同步

    const ratio = el.scrollTop / scrollableDistance

    panelsRef.current.forEach((other) => {
      if (other === el) return
      const otherScrollable = other.scrollHeight - other.clientHeight
      other.scrollTo(0, otherScrollable * ratio)
    })
  }, [])

  // 事件处理器引用稳定，元素挂载/卸载时按需 add/remove，不会重复绑定
  const bindPanel = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return

      panelsRef.current.add(el)
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
      el.addEventListener('scroll', onScroll, { passive: true })

      // React 19 ref cleanup：元素卸载时移除监听并注销
      return () => {
        panelsRef.current.delete(el)
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
        el.removeEventListener('scroll', onScroll)
      }
    },
    [onMouseEnter, onMouseLeave, onScroll],
  )

  return bindPanel
}

export default useSyncScroll
