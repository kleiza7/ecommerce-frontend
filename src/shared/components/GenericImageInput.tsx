import { useRef } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { AddIcon, CloseIcon } from "../../assets/icons";
import { customTwMerge } from "../utils/Tailwind.util";

type GenericImageInputProps<TFieldValues extends FieldValues> = {
  field: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  disabled?: boolean;
  exactFileCount?: number;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;

  className?: string;
};

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const GenericImageInput = <TFieldValues extends FieldValues>({
  field,
  control,
  disabled = false,
  exactFileCount,
  rules,
  className,
}: GenericImageInputProps<TFieldValues>) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Controller
      name={field}
      control={control}
      rules={{
        ...(exactFileCount !== undefined && {
          validate: (files: File[]) => {
            return (
              files.length === exactFileCount ||
              `Exactly ${exactFileCount} images are required`
            );
          },
        }),
        ...rules,
      }}
      render={({ field }) => {
        const files = (field.value ?? []) as File[];

        return (
          <>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              multiple
              accept={ACCEPTED_FILE_TYPES.join(",")}
              disabled={disabled}
              onChange={(event) => {
                const selectedFiles = Array.from(event.target.files ?? []);
                const validFiles = selectedFiles.filter((selectedFile) => {
                  return ACCEPTED_FILE_TYPES.includes(
                    selectedFile.type as (typeof ACCEPTED_FILE_TYPES)[number],
                  );
                });

                const nextFiles =
                  exactFileCount !== undefined
                    ? [...files, ...validFiles].slice(0, exactFileCount)
                    : [...files, ...validFiles];

                field.onChange(nextFiles);
                event.target.value = "";
              }}
            />

            <div className={customTwMerge("flex h-12 gap-3", className)}>
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                  className="border-gray-2 relative h-full w-12 overflow-hidden rounded border"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-full w-full object-cover"
                    alt={file.name}
                  />

                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => {
                        field.onChange(
                          files.filter((_, fileIndex) => {
                            return fileIndex !== index;
                          }),
                        );
                      }}
                      className="absolute top-0 right-0 cursor-pointer rounded-full bg-black/40 p-0.5"
                    >
                      <CloseIcon className="fill-surface-primary h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}

              {!disabled &&
                (exactFileCount === undefined ||
                  files.length < exactFileCount) && (
                  <button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    className="border-gray-2 hover:bg-gray-12 flex h-full w-12 cursor-pointer items-center justify-center rounded border"
                  >
                    <AddIcon className="fill-gray-2" />
                  </button>
                )}
            </div>
          </>
        );
      }}
    />
  );
};

export default GenericImageInput;
