import { errorToaster } from "@/components/toaster/error-toaster";
import { successToaster } from "@/components/toaster/success-toaster";

type CopyFn = (text: string) => void // Return success

export function useCopyToClipboard(): [CopyFn] {

  const unSecureCopy = (text: string) => {

    const textArea = document.createElement("textarea");

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.focus({ preventScroll: true });

    textArea.select();

    try {
      document.execCommand('copy');
      successToaster({ message: 'Behasil copy to clipboard' })

    } catch (err) {
      console.error('Unable to copy to clipboard', err);
      errorToaster({ message: 'Gagal copy to clipboard' })
    }

    document.body.removeChild(textArea);
  }

  const secureCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      successToaster({ message: 'Behasil copy to clipboard' })
    } catch (error) {
      errorToaster({ message: 'Gagal copy to clipboard' })
    }
  }

  const copy: CopyFn = async (text) => {
    if (navigator.clipboard) {
      secureCopy(text)
    } else {
      unSecureCopy(text)
    }
  }

  return [copy]
}