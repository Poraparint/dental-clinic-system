"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Props = {
  categories: {
    id: string;
    name: string;
    createdAt: Date;
    onEdit?: (id: string) => void;
  }[];
  onReorder: (orderedIds: string[]) => void;
};

type SortableItemProps = {
  id: string;
  name: string;
  createdAt: Date;
  onEdit?: (id: string) => void;
};

export const DraggableCategoryList = ({ categories, onReorder }: Props) => {
  const [items, setItems] = useState(categories.map((c) => c.id));

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((id) => {
            const category = categories.find((c) => c.id === id)!;
            return (
              <SortableItem
                key={category.id}
                id={category.id}
                name={category.name}
                createdAt={category.createdAt}
                onEdit={category.onEdit}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

function SortableItem({ id, name, createdAt, onEdit }: SortableItemProps) {
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
    cursor: "grab",
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 rounded-xl shadow-sm border hover:shadow-md transition flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        <GripVertical className="text-muted-foreground" size={18} />
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">
            บันทึกเมื่อ {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <button
        onClick={() => onEdit?.(id)}
        className="text-primary hover:underline text-sm flex items-center space-x-1"
      >
        <Pencil size={16} />
        <span>แก้ไข</span>
      </button>
    </div>
  );
}
