import { useState } from "react";
import { Button, Paper, Box } from '@mui/material';
import { sendResponse } from '../utils/sendResponse';
import { SortableFormProps } from "../interfaces/Job";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableItemProps {
  id: string;
}

const DraggableItem = ({ id }: DraggableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? '#1976d2' : '#333', // dark background
    color: '#fff', // white text
    padding: '8px 16px',
    margin: '8px auto',
    borderRadius: '8px',
    width: '90%', // make it more mobile-friendly with a slightly narrower width
    maxWidth: '600px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

const SortForm = (props: SortableFormProps) => {
  const [sortResponse, setSortResponse] = useState(props.sortable);
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sortResponse.indexOf(active.id);
      const newIndex = sortResponse.indexOf(over.id);
      setSortResponse((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendResponse(props.jobId, sortResponse);
    navigate('/dashboard/jobs');
  };

  return (
    <form onSubmit={submitForm}>
      <Box sx={{ marginBottom: 2, padding: 2 }}>
        <p>Drag to reorder:</p>
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sortResponse} strategy={verticalListSortingStrategy}>
              {sortResponse.map((item) => (
                <DraggableItem key={item} id={item} />
              ))}
            </SortableContext>
          </DndContext>
        </Paper>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: 3, marginBottom: 4 }}
      >
        Mark Completed
      </Button>
    </form>
  );
};

export default SortForm;
