
/**
 * Converts a File object to a Base64 encoded string.
 * This is necessary for sending file data in a JSON payload to the Gemini API.
 * @param file - The file to convert.
 * @returns A promise that resolves with the Base64 string.
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // The result includes the data URL prefix (e.g., "data:application/pdf;base64,"),
      // so we split it and take only the Base64 part.
      const base64String = (reader.result as string).split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error("Failed to read file as Base64."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
