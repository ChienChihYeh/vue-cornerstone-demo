import { ref } from 'vue'

export function useSlice(initialSlice: number) {
  const slice = ref(initialSlice)

  function setSlice(index: number) {
    slice.value = index
  }

  return { slice, setSlice }
}
