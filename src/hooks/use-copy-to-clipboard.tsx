type CopyFn = (text: string, cb: (status: 'success' | 'failed') => void) => void // Return success

export function useCopyToClipboard(): [CopyFn] {

  const copy: CopyFn = async (text, cb) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      cb('failed')
      return false
    }
    
    try {
      await navigator.clipboard.writeText(text)
      cb('success')
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      cb('failed')
      return false
    }
  }

  return [copy]
}