import React from "react";
import { useVisualizationTabs } from "../../hooks/useVisualizationTabs";
import { TabsBar } from "./TabsBar";
import { VisualizationRenderer } from "./VisualizationRenderer";
import "./mainPanel.css";

export const MainPanel: React.FC = () => {
  const {
    tabs,
    activeTabId,
    addTab,
    closeTab,
    activateTab,
    pinTab,
    setTabs
  } = useVisualizationTabs();

  const handleReorder = (newTabs: typeof tabs) => {
    setTabs(newTabs);
  };

  const activeTab = tabs.find(t => t.id === activeTabId); // ← poprawione

  return (
    <div className="main-panel">
      <TabsBar
        tabs={tabs}
        activeTabId={activeTabId}
        onAdd={addTab}
        onClose={closeTab}
        onActivate={activateTab}
        onPin={pinTab}
        onReorder={handleReorder}
      />

      <div className="tab-content">
        {activeTab ? (
          <VisualizationRenderer tab={activeTab} />
        ) : (
          <div className="empty">Brak otwartej wizualizacji</div>
        )}
      </div>
    </div>
  );
};

