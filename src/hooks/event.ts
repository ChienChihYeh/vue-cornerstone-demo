import { onMounted, onUnmounted, type Ref } from 'vue'

export function useEventListener(
  target: Ref | Window,
  event: string,
  callback: EventListenerOrEventListenerObject
) {
  function eventTarget(target: Ref | Window) {
    if (target instanceof Window) return target
    return target.value
  }

  onMounted(() => eventTarget(target).addEventListener(event, callback))
  onUnmounted(() => eventTarget(target).removeEventListener(event, callback))
}
