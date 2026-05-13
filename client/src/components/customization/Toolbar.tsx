import React from 'react';
import { Plus, Trash2, RotateCw, Type } from 'lucide-react';

interface ToolbarProps {
  selectedId: string | null;
  textColor: string;
  fontSize: number;
  onAddText: () => void;
  onChangeColor: (color: string) => void;
  onChangeFontSize: (size: number) => void;
  onDelete: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  zoom: number;
}

const Toolbar: React.FC<ToolbarProps> = ({
  selectedId,
  textColor,
  fontSize,
  onAddText,
  onChangeColor,
  onChangeFontSize,
  onDelete,
  onZoomIn,
  onZoomOut,
  onReset,
  zoom,
}) => {
  return (
    <div className="bg-white border-b border-gray-300 shadow-sm p-4 flex items-center gap-4 flex-wrap">
      {/* Text Tools */}
      <button
        onClick={onAddText}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        title="Add draggable text (A)"
      >
        <Plus size={20} />
        Add Text
      </button>

      {/* Text color picker */}
      <div className="flex items-center gap-2">
        <Type size={20} className="text-gray-600" />
        <input
          type="color"
          value={textColor}
          onChange={(e) => onChangeColor(e.target.value)}
          disabled={!selectedId}
          className="w-10 h-10 rounded cursor-pointer disabled:opacity-50"
          title="Change text color"
        />
        <span className="text-sm text-gray-600">Color</span>
      </div>

      {/* Font size control */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Font Size:</label>
        <input
          type="range"
          min="8"
          max="72"
          value={fontSize}
          onChange={(e) => onChangeFontSize(parseInt(e.target.value))}
          disabled={!selectedId}
          className="w-32 disabled:opacity-50"
          title="Adjust font size"
        />
        <span className="text-sm text-gray-600 w-12 text-right">{fontSize}px</span>
      </div>

      {/* Delete button */}
      <button
        onClick={onDelete}
        disabled={!selectedId}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete selected text (Delete)"
      >
        <Trash2 size={20} />
        Delete
      </button>

      {/* Divider */}
      <div className="h-8 border-l border-gray-300"></div>

      {/* Zoom controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onZoomOut}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
          title="Zoom out"
        >
          −
        </button>
        <span className="text-sm font-medium text-gray-700 w-12 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={onZoomIn}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
          title="Zoom in"
        >
          +
        </button>
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        title="Reset view"
      >
        <RotateCw size={20} />
        Reset
      </button>

      {/* Helpful text */}
      <div className="ml-auto text-xs text-gray-500 hidden sm:block">
        Tip: Select text to edit • Press Delete to remove
      </div>
    </div>
  );
};

export default Toolbar;
