import { Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useDropzone } from "react-dropzone"

interface ImageUploadProps {
    onImageUpload: (file: File) => void
    currentImage?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            onImageUpload(file); // Pass the actual file object
            const fileUrl = URL.createObjectURL(file); // Generate a URL for the file
            setImageUrl(fileUrl); // Set the image URL for preview
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: { "image/*": [] } });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"}`}
        >
            <input {...getInputProps()} onChange={handleFileChange} />
            {currentImage || imageUrl ? (
                <div className="relative w-full h-60">
                    <Image
                        src={imageUrl || currentImage || "/placeholder.svg"} // Use generated URL or existing image
                        alt="Uploaded image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-40">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600">
                        {isDragActive ? "Drop the image here" : "Drag & drop an image here, or click to select"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
