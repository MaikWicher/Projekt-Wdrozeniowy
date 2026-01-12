import type { VisualizationTab } from "../../../types/visualization";

export const ChartView: React.FC<{ tab: VisualizationTab }> = ({ tab }) => (
  <div className="viz-placeholder">
    📊 Wykres: <strong>{tab.title}</strong>
  </div>
);
