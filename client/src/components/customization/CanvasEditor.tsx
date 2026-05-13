import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import EditableText, { TextObject } from './EditableText';
import TshirtMockup from './TshirtMockup';

interface CanvasEditorProps {
  textObjects: TextObject[];
  selectedId: string | null;
  textColor: string;
  fontSize: number;
  zoom: number;
  onTextUpdate: (id: string, updates: Partial<TextObject>) => void;
  onSelectText: (id: string) => void;
  onDeleteText: (id: string) => void;
  onZoom: (delta: number) => void;
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({
  textObjects,
  selectedId,
  textColor,
  fontSize,
  zoom,
  onTextUpdate,
  onSelectText,
  onDeleteText,
  onZoom,
}) => {
  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = stageRef.current?.container();
      if (container) {
        setStageSize({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse wheel zoom
  const handleWheel = useCallback(
    (e: any) => {
      e.evt.preventDefault();

      if (!stageRef.current) return;

      const scaleBy = 1.1;
      const oldScale = stageRef.current.scaleX();
      const pointer = stageRef.current.getPointerPosition();

      if (!pointer) return;

      const mousePointTo = {
        x: (pointer.x - stageRef.current.x()) / oldScale,
        y: (pointer.y - stageRef.current.y()) / oldScale,
      };

      const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

      stageRef.current.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      stageRef.current.position(newPos);
      stageRef.current.batchDraw();

      onZoom(newScale / 1); // Report zoom level
    },
    [onZoom]
  );

  // Click on empty area to deselect
  const handleCanvasClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      onSelectText('');
    }
  };

  if (stageSize.width === 0) {
    return <div className="flex-1 bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  const canvasWidth = stageSize.width;
  const canvasHeight = stageSize.height;

  // Center the T-shirt mockup
  const mockupWidth = Math.min(400, canvasWidth * 0.4);
  const mockupHeight = mockupWidth * 1.2;
  const mockupX = (canvasWidth - mockupWidth) / 2;
  const mockupY = (canvasHeight - mockupHeight) / 2;

  return (
    <div className="flex-1 bg-gray-100 relative overflow-hidden">
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        onWheel={handleWheel}
        onClick={handleCanvasClick}
        draggable
        className="bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <Layer ref={layerRef}>
          {/* Grid background */}
          {Array.from({ length: Math.ceil(canvasWidth / 50) }).map((_, i) =>
            Array.from({ length: Math.ceil(canvasHeight / 50) }).map((_, j) => (
              <Rect
                key={`grid-${i}-${j}`}
                x={i * 50}
                y={j * 50}
                width={50}
                height={50}
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            ))
          )}

          {/* T-shirt mockup */}
          <TshirtMockup x={mockupX} y={mockupY} width={mockupWidth} height={mockupHeight} />

          {/* Editable text objects */}
          {textObjects.map((textObj) => (
            <EditableText
              key={textObj.id}
              id={textObj.id}
              text={textObj.text}
              x={textObj.x}
              y={textObj.y}
              fontSize={textObj.fontSize}
              fontFamily={textObj.fontFamily}
              fill={textObj.fill}
              rotation={textObj.rotation}
              isSelected={selectedId === textObj.id}
              onSelect={onSelectText}
              onUpdate={onTextUpdate}
              onDelete={onDeleteText}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasEditor;
