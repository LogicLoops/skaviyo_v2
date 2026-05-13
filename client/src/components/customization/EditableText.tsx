import React, { useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';
import type Konva from 'konva';

interface EditableTextProps {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  rotation: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TextObject>) => void;
  onDelete?: (id: string) => void;
}

export interface TextObject {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  rotation: number;
}

const EditableText: React.FC<EditableTextProps> = ({
  id,
  text,
  x,
  y,
  fontSize,
  fontFamily,
  fill,
  rotation,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}) => {
  const textRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  // Attach transformer to selected text
  useEffect(() => {
    if (isSelected && textRef.current && transformerRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  // Handle text dragging
  const handleDragEnd = (e: any) => {
    onUpdate(id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  // Handle text transformation (resize, rotate)
  const handleTransformEnd = () => {
    if (textRef.current) {
      const node = textRef.current;
      onUpdate(id, {
        x: node.x(),
        y: node.y(),
        fontSize: Math.max(5, node.fontSize() * node.scaleY()),
        rotation: node.rotation(),
      });
      node.scaleY(1);
      node.scaleX(1);
    }
  };

  // Handle keyboard delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelected && (e.key === 'Delete' || e.key === 'Backspace') && onDelete) {
        e.preventDefault();
        onDelete(id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelected, id, onDelete]);

  return (
    <>
      <Text
        ref={textRef}
        text={text}
        x={x}
        y={y}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        rotation={rotation}
        draggable
        onDragEnd={handleDragEnd}
        onClick={() => onSelect(id)}
        onTap={() => onSelect(id)}
        onTransformEnd={handleTransformEnd}
        padding={5}
        align="center"
        verticalAlign="middle"
      />
      {isSelected && <Transformer ref={transformerRef} rotationSnaps={[0, 90, 180, 270]} />}
    </>
  );
};

export default EditableText;
