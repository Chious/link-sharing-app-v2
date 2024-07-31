import { useState } from "react";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import SortableItem from "./drag-item";
import { useUser } from "@/contexts/provider";

export default function DragCollection({ setEditing }: { setEditing: any }) {
  const { userLinks, setUserLinks } = useUser();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) {
      return;
    }

    if (active.id == over.id) {
      return;
    }

    setUserLinks((items) => {
      return arrayMove(
        items,
        items.findIndex((it) => it.id == active.id),
        items.findIndex((it) => it.id == over.id)
      );
    });
  };

  const setItemVal = (id: string, val: string, key: string) => {
    setEditing(true);
    setUserLinks(
      userLinks.map((item) => {
        if (item.id == id) {
          return { ...item, [key]: val };
        }
        return item;
      })
    );
  };

  const delItem = (id: string) => {
    setUserLinks(userLinks.filter((item) => item.id !== id));
  };

  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={userLinks} strategy={rectSortingStrategy}>
          {userLinks.length > 0 &&
            userLinks.map((item, index) => {
              return (
                <SortableItem
                  data={item}
                  key={index}
                  index={index}
                  setItemVal={setItemVal}
                  delItem={delItem}
                />
              );
            })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
