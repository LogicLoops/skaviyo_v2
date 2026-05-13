# T-Shirt Customization Canvas Documentation

## Overview

This is a full-screen product customization editor built with React and Konva.js. It allows users to add, edit, move, resize, and rotate text on a T-shirt mockup. The editor is accessible at `/customization` route.

## Features

### Core Features
- ✅ **T-Shirt Mockup**: Visual representation of a T-shirt with sleeves and neck
- ✅ **Printable Safe Area**: Red dashed rectangle indicating where text can be safely printed
- ✅ **Draggable Text**: Click and drag text anywhere on the canvas
- ✅ **Text Resizing**: Transformer handles to resize selected text
- ✅ **Text Rotation**: Rotate text using transformer corner handles
- ✅ **Text Color**: Change color of selected text
- ✅ **Font Size**: Adjust font size from 8px to 72px
- ✅ **Delete Objects**: Remove selected text objects
- ✅ **Zoom Support**: Scroll wheel to zoom in/out
- ✅ **Grid Background**: Visual grid for alignment
- ✅ **Responsive Canvas**: Adapts to window resize

### Keyboard Shortcuts
- **Ctrl/Cmd + A**: Add new text
- **Delete/Backspace**: Delete selected text
- **Mouse Wheel**: Zoom in/out
- **Click Empty Area**: Deselect current selection

## File Structure

```
src/
├── pages/
│   └── CustomizationPage.tsx          # Main page component
├── components/customization/
│   ├── CanvasEditor.tsx               # Konva Stage and Layer management
│   ├── Toolbar.tsx                    # Control buttons and inputs
│   ├── TshirtMockup.tsx              # T-shirt visual component
│   └── EditableText.tsx              # Draggable, resizable text component
└── App.tsx                            # Route definition (/customization)
```

## Component Details

### CustomizationPage
Main container component that:
- Manages application state (text objects, selection, colors, font size)
- Handles toolbar actions
- Provides keyboard shortcuts
- Shows status bar with info

### CanvasEditor
Konva Stage wrapper that:
- Renders grid background
- Displays T-shirt mockup
- Manages text objects
- Handles zoom and pan
- Handles canvas click for deselection

### Toolbar
UI controls including:
- Add Text button
- Color picker
- Font size slider
- Delete button
- Zoom controls
- Reset view button

### TshirtMockup
Draws a T-shirt with:
- Body (white rectangle)
- Left and right sleeves
- Neck opening
- Printable safe area (dashed red rectangle)
- Area label

### EditableText
Individual text object that:
- Renders Konva Text node
- Supports dragging
- Supports resizing/rotation via Transformer
- Shows transformer when selected
- Handles keyboard delete

## State Management

The CustomizationPage manages:

```typescript
interface TextObject {
  id: string;              // Unique identifier
  text: string;           // Text content
  x: number;              // X coordinate
  y: number;              // Y coordinate
  fontSize: number;       // Font size in pixels
  fontFamily: string;     // Font family name
  fill: string;          // Text color (hex)
  rotation: number;      // Rotation in degrees
}

// Component state:
- textObjects[]          // Array of text objects
- selectedId            // Currently selected text ID
- textColor             // Current text color
- fontSize              // Current font size
- zoom                  // Current zoom level
```

## Usage Example

To navigate to the customization page from anywhere in the app:

```typescript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleCustomize = () => {
    navigate('/customization');
  };
  
  return (
    <button onClick={handleCustomize}>
      Customize Product
    </button>
  );
}
```

## Styling

- **TailwindCSS**: All non-canvas UI elements use Tailwind utilities
- **Konva Canvas**: SVG-based rendering for the T-shirt and text
- **Color Scheme**: 
  - White: T-shirt and background
  - Blue: Add Text button
  - Red: Delete button
  - Gray: Navigation and controls
  - Red (#ff6b6b): Printable area indicator

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ⚠️ Touch support available but not optimized

## Performance Considerations

- Canvas is responsive to window resize
- Grid background is regenerated on resize
- Transformer only renders for selected objects
- Layer batching used for drawing optimization

## Future Enhancements

- [ ] Export design as image (PNG/SVG)
- [ ] Save design to database
- [ ] Load saved designs
- [ ] Undo/Redo functionality
- [ ] Multiple mockup products (hoodie, cap, etc.)
- [ ] Image upload support
- [ ] Shape tools (circles, rectangles, lines)
- [ ] Font selection
- [ ] Text alignment options
- [ ] Preset designs
- [ ] Share designs

## Installation & Setup

1. Install dependencies:
```bash
npm install react-konva konva
npm install --save-dev @types/konva
```

2. The route is already configured in App.tsx:
```tsx
<Route
  path="/customization"
  element={
    <ProtectedRoute allowedRole="CUSTOMER">
      <CustomizationPage />
    </ProtectedRoute>
  }
/>
```

3. Navigate to `/customization` to access the editor

## API Integration (Future)

When backend is ready, add these endpoints:
- `POST /api/designs` - Save design
- `GET /api/designs/:id` - Load design
- `PUT /api/designs/:id` - Update design
- `DELETE /api/designs/:id` - Delete design

## Known Limitations

- No text wrapping (single line text only)
- No gradient fills
- No shadow effects
- No image placement
- No multi-select
- No layers panel

## Troubleshooting

### Canvas not rendering
- Check browser console for errors
- Verify Konva library is installed
- Clear browser cache

### Performance issues
- Reduce zoom level
- Limit number of text objects
- Check for browser extensions interfering with canvas

### Transformer not showing
- Click on text object to select
- Verify selectedId matches object ID
- Check z-index layering

## References

- [Konva.js Documentation](https://konvajs.org/)
- [React Konva Guide](https://react-konva.js.org/)
- [React Router Documentation](https://reactrouter.com/)
