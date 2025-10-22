export const copyToClipboard = async (text: string | null) => {
  try {
    if (!text) return false;

    await navigator.clipboard.writeText(text);

    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
