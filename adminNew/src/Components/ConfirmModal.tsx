import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-red-100 p-2">
              <FiAlertTriangle className="text-xl text-red-600" />
            </div>

            <h2 className="text-xl font-bold">
              {title}
            </h2>

          </div>

          <button
            onClick={onCancel}
            className="rounded-lg p-1 hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="leading-7 text-gray-600">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100 disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Please wait..." : confirmText}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;