import type { VisualizationTab, VisualizationType } from "../../types/visualization";
import { TabItem } from "./TabItem";
import "./mainPanel.css";

import { DndContext, PointerSensor, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useSensor, useSensors } from "@dnd-kit/core";
import React, { useState, useRef, useEffect } from "react";

import { FaChartLine, FaProjectDiagram, FaTachometerAlt, FaColumns } from "react-icons/fa";

interface Props {
  tabs: VisualizationTab[];
  activeTabId: string | null;
  onAdd(type: VisualizationType): void;
  onClose(id: string): void;
  onActivate(id: string): void;
  onPin(id: string): void;
  onReorder(tabs: VisualizationTab[]): void;
}

// Mapowanie typu na ikonę
const iconMap = {
  chart: FaChartLine,
  graph: FaProjectDiagram,
  dashboard: FaTachometerAlt,
  comparison: FaColumns
};

// Polskie napisy dla podglądu
const visualizationLabels: Record<VisualizationType, string> = {
  chart: "Wykres",
  graph: "Graf",
  dashboard: "Dashboard",
  comparison: "Widok porównawczy"
};

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
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredType, setHoveredType] = useState<VisualizationType | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = tabs.findIndex(t => t.id === active.id);
    const newIndex = tabs.findIndex(t => t.id === over.id);

    onReorder(arrayMove(tabs, oldIndex, newIndex));
  };

  // Zamknięcie menu po kliknięciu poza dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const types: { label: string; value: VisualizationType; icon: any }[] = [
    { label: "Wykres", value: "chart", icon: FaChartLine },
    { label: "Graf", value: "graph", icon: FaProjectDiagram },
    { label: "Dashboard", value: "dashboard", icon: FaTachometerAlt },
    { label: "Widok porównawczy", value: "comparison", icon: FaColumns }
  ];

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

          <div className="tab-add-container" ref={menuRef}>
            <button className="tab-add" onClick={() => setShowMenu(!showMenu)}>+</button>

            {showMenu && (
              <div className="tab-add-menu">
                {types.map(t => {
                  const Icon = t.icon;
                  const isHovered = hoveredType === t.value;

                  return (
                    <div
                      key={t.value}
                      className="tab-add-menu-item"
                      onMouseEnter={() => setHoveredType(t.value)}
                      onMouseLeave={() => setHoveredType(null)}
                      onClick={() => {
                        onAdd(t.value);
                        setShowMenu(false);
                      }}
                      style={{ display: "flex", alignItems: "center", position: "relative" }}
                    >
                      <Icon style={{ marginRight: 8 }} />
                      <span>{t.label}</span>

                      {isHovered && (
                        <div className="tab-add-preview">
                          <div className="preview-box">
                            Podgląd: {visualizationLabels[t.value]}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};
