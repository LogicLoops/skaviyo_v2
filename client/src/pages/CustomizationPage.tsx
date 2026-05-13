import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Toolbar from '../components/customization/Toolbar';
import CanvasEditor from '../components/customization/CanvasEditor';
import { TextObject } from '../components/customization/EditableText';

const CustomizationPage: React.FC = () => {
  const navigate = useNavigate();
  const [textObjects, setTextObjects] = useState<TextObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string>('#000000');
  const [fontSize, setFontSize] = useState<number>(24);
  const [zoom, setZoom] = useState<number>(1);
  const textCounter = React.useRef<number>(0);

  // Add new text object
  const handleAddText = useCallback(() => {
    textCounter.current += 1;
    const newText: TextObject = {
      id: `text-${textCounter.current}`,
      text: 'Edit me',
      x: 200 + Math.random() * 50,
      y: 200 + Math.random() * 50,
      fontSize: fontSize,
      fontFamily: 'Arial',
      fill: textColor,
      rotation: 0,
    };
    setTextObjects((prev) => [...prev, newText]);
    setSelectedId(newText.id);
  }, [fontSize, textColor]);

  // Update text object
  const handleTextUpdate = useCallback((id: string, updates: Partial<TextObject>) => {
    setTextObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj))
    );
  }, []);

  // Change color of selected text
  const handleChangeColor = useCallback((color: string) => {
    setTextColor(color);
    if (selectedId) {
      handleTextUpdate(selectedId, { fill: color });
    }
  }, [selectedId, handleTextUpdate]);

  // Change font size of selected text
  const handleChangeFontSize = useCallback(
    (size: number) => {
      setFontSize(size);
      if (selectedId) {
        handleTextUpdate(selectedId, { fontSize: size });
      }
    },
    [selectedId, handleTextUpdate]
  );

  // Delete selected text
  const handleDelete = useCallback(() => {
    if (selectedId) {
      setTextObjects((prev) => prev.filter((obj) => obj.id !== selectedId));
      setSelectedId(null);
    }
  }, [selectedId]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  // Update color and size when selecting text
  const handleSelectText = useCallback((id: string) => {
    setSelectedId(id);
    const selected = textObjects.find((obj) => obj.id === id);
    if (selected) {
      setTextColor(selected.fill);
      setFontSize(selected.fontSize);
    }
  }, [textObjects]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 'A' to add text
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleAddText();
      }
      // Delete selected
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAddText, handleDelete, selectedId]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">T-Shirt Customization</h1>
          <p className="text-sm text-gray-600 mt-1">
            Drag text to move • Scroll to zoom • Select to edit properties
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Close customization editor"
        >
          <X size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Toolbar */}
      <Toolbar
        selectedId={selectedId}
        textColor={textColor}
        fontSize={fontSize}
        onAddText={handleAddText}
        onChangeColor={handleChangeColor}
        onChangeFontSize={handleChangeFontSize}
        onDelete={handleDelete}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleResetZoom}
        zoom={zoom}
      />

      {/* Canvas Editor */}
      <CanvasEditor
        textObjects={textObjects}
        selectedId={selectedId}
        textColor={textColor}
        fontSize={fontSize}
        zoom={zoom}
        onTextUpdate={handleTextUpdate}
        onSelectText={handleSelectText}
        onDeleteText={handleDelete}
        onZoom={setZoom}
      />

      {/* Status bar */}
      <div className="bg-white border-t border-gray-200 p-3 flex items-center justify-between text-sm text-gray-600">
        <span>
          {selectedId ? `✓ Selected: ${selectedId}` : 'Click on text to select'}
        </span>
        <span>{textObjects.length} text object(s)</span>
      </div>
    </div>
  );
};

export default CustomizationPage;
