
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
    name: string;
    label: string;
    onFileChange: (name: string, file: File | null) => void;
    isOptional?: boolean;
}

export default function ImageUpload({ name, label, onFileChange, isOptional = false }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            onFileChange(name, selectedFile);
        }
    }, [name, onFileChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        maxFiles: 1,
    });

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setPreview(null);
        onFileChange(name, null);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label} {isOptional && <span className="text-xs text-muted-foreground">(Optional)</span>}</Label>
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                    isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:bg-gray-50"
                )}
            >
                <input {...getInputProps()} id={name} />

                {preview && file ? (
                    <>
                        <Image src={preview} alt={file.name} layout="fill" objectFit="cover" className="rounded-lg" />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-10"
                            aria-label="Remove image"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <Upload className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm">
                            {isDragActive ? "Drop the file here" : "Drag & drop or click to upload"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
