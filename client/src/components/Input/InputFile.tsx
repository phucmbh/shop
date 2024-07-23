import { useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file: File) => void
}

const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    const MAX_1_MB = 1048567
    if (fileFromLocal) {
      if (!fileFromLocal?.type.includes('image')) return toast.error('Ảnh không đúng định dạng')
      if (fileFromLocal?.size > MAX_1_MB) return toast.error('Ảnh không được quá 1MB')
      onChange && onChange(fileFromLocal)
    }
  }

  const handleClickImage = () => {
    fileInputRef.current?.click()
  }
  return (
    <div>
      <input
        name="avatar"
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        onChange={onFileChange}
      />

      <button
        type="button"
        onClick={handleClickImage}
        className="rounded-sm border border-gray-200 px-5 py-2 shadow-sm"
      >
        Chọn ảnh
      </button>
    </div>
  )
}
export default InputFile
