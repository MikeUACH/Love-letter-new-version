const UPLOAD_PRESET = "love-letter";

type CloudinaryUploadResponse = {
  secure_url: string;
};

function isCloudinaryUploadResponse(value: unknown): value is CloudinaryUploadResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "secure_url" in value &&
    typeof value.secure_url === "string"
  );
}

function getCloudinaryErrorMessage(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null || !("error" in value)) {
    return undefined;
  }

  const error = value.error;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return undefined;
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error("Configura VITE_CLOUDINARY_CLOUD_NAME para subir fotos.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Selecciona un archivo de imagen.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("Cloudinary devolvió una respuesta inválida.");
  }

  if (!response.ok) {
    const message = getCloudinaryErrorMessage(result);
    throw new Error(message ?? `Cloudinary respondió con HTTP ${response.status}.`);
  }

  if (!isCloudinaryUploadResponse(result)) {
    throw new Error("Cloudinary no devolvió una URL segura válida.");
  }

  return result.secure_url;
}
