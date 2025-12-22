import type { VisualizationTab } from "../../types/visualization";
import { TabItem } from "./TabItem";
import "./mainPanel.css";

import { DndContext, PointerSensor, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useSensor, useSensors } from "@dnd-kit/core";

interface Props {
  tabs: VisualizationTab[];
  activeTabId: string | null;
  onAdd(type: VisualizationTab["type"]): void;
  onClose(id: string): void;
  onActivate(id: string): void;
  onPin(id: string): void;
  onReorder(tabs: VisualizationTab[]): void;
}

export const TabsBar: React.FC<Props> = ({
  tabs,
  activeTabId,
  onAdd,
  onClose,
  onActivate,
  onPin,
  onReorder
}) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = tabs.findIndex(t => t.id === active.id);
    const newIndex = tabs.findIndex(t => t.id === over.id);

    onReorder(arrayMove(tabs, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tabs.map(t => t.id)} strategy={horizontalListSortingStrategy}>
        <div className="tabs-bar">
          {tabs.map(tab => (
            <TabItem
              key={tab.id}
              tab={tab}
              active={tab.id === activeTabId}
              onActivate={onActivate}
              onClose={onClose}
              onPin={onPin}
            />
          ))}
          <button className="tab-add" onClick={() => onAdd("chart")}>+</button>
        </div>
      </SortableContext>
    </DndContext>
  );
};
