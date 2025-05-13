import React from 'react';

interface DownloadCardProps {
  cardPath: string;
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE_URL = 'https://api.vmsbutu.it.com';

const DownloadCardPopup: React.FC<DownloadCardProps> = ({ cardPath, isOpen, onClose }) => {
  if (!isOpen) return null;

  const downloadUrl = `${API_BASE_URL}/users/download-visitor-card/?card_path=${encodeURIComponent(cardPath)}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = cardPath.split('/').pop() || 'visitor_card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Download Your Registration Card</h2>
        <img
          src={downloadUrl}
          alt="Visitor Card Preview"
          className="mx-auto mb-4 max-h-48 rounded border"
        />
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleDownload}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
          >
            Download
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadCardPopup;
