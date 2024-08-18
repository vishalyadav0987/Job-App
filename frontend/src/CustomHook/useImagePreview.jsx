import { useState } from 'react'
import toast from 'react-hot-toast'

const useImagePreview = () => {
    const [imageUrl, setIamgeUrl] = useState("");
    const handleImageOnChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIamgeUrl(reader.result);
            }
            reader.readAsDataURL(file);
        }
        else {
            toast.error("Please Check formate of Image!");
            setIamgeUrl(null);
        }
    }
    return { handleImageOnChange, setIamgeUrl, imageUrl }
}

export default useImagePreview
