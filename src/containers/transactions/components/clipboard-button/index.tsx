import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/containers/transactions/utils/copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type ClipboardButtonProps = {
  value: string;
};

export const ClipboardButton = ({ value }: ClipboardButtonProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyToClipboard = async (text: string | null) => {
    const success = await copyToClipboard(text);

    if (!success) return;

    setCopied(text);
    setTimeout(() => setCopied(null), 5000);
  };

  const isCopied = copied === value;

  return (
    <Button
      variant="ghost"
      className="!p-1 h-fit cursor-pointer"
      onClick={() => handleCopyToClipboard(value)}
      title={isCopied ? 'Copied!' : 'Copy phone number'}
    >
      {isCopied ? (
        <Check className="size-3.5 text-green-600" />
      ) : (
        <Copy className="size-3.5 text-gray-400 hover:text-gray-700" />
      )}
    </Button>
  );
};
