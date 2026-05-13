import React from 'react';
import { Rect, Text, Group, Circle } from 'react-konva';

interface TshirtMockupProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TshirtMockup: React.FC<TshirtMockupProps> = ({ x, y, width, height }) => {
  // T-shirt proportions: body is main rectangle, sleeves and neck are additions
  const bodyWidth = width * 0.6;
  const bodyHeight = height * 0.75;
  const neckSize = width * 0.15;
  const sleeveWidth = width * 0.2;
  const sleeveHeight = height * 0.3;

  return (
    <Group>
      {/* T-shirt body */}
      <Rect
        x={x + width / 2 - bodyWidth / 2}
        y={y}
        width={bodyWidth}
        height={bodyHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={2}
      />

      {/* Left sleeve */}
      <Rect
        x={x + width / 2 - bodyWidth / 2 - sleeveWidth}
        y={y + height * 0.15}
        width={sleeveWidth}
        height={sleeveHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={2}
      />

      {/* Right sleeve */}
      <Rect
        x={x + width / 2 + bodyWidth / 2}
        y={y + height * 0.15}
        width={sleeveWidth}
        height={sleeveHeight}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={2}
      />

      {/* Neck opening (circle for simplicity) */}
      <Circle
        cx={x + width / 2}
        cy={y + height * 0.12}
        radius={neckSize}
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={2}
      />

      {/* Printable safe area indicator (dashed rectangle) */}
      <Rect
        x={x + width / 2 - bodyWidth * 0.4}
        y={y + height * 0.25}
        width={bodyWidth * 0.8}
        height={bodyHeight * 0.5}
        fill="transparent"
        stroke="#ff6b6b"
        strokeWidth={1}
        dash={[5, 5]}
      />

      {/* Label for printable area */}
      <Text
        x={x + width / 2 - 80}
        y={y + height * 0.22}
        fontSize={12}
        fill="#ff6b6b"
        text="Printable Area"
        fontFamily="Arial"
      />
    </Group>
  );
};

export default TshirtMockup;
