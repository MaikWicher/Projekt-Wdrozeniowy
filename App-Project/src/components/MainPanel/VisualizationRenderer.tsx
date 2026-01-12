import type { VisualizationTab } from "../../types/visualization";
import { ChartView } from "./visualizations/ChartView";
import { GraphView } from "./visualizations/GraphView";
import { DashboardView } from "./visualizations/DashboardView";
import { ComparisonView } from "./visualizations/ComparisonView";

interface Props {
  tab: VisualizationTab;
}

export const VisualizationRenderer: React.FC<Props> = ({ tab }) => {
  switch (tab.type) {
    case "chart":
      return <ChartView tab={tab} />;

    case "graph":
      return <GraphView tab={tab} />;

    case "dashboard":
      return <DashboardView tab={tab} />;

    case "comparison":
      return <ComparisonView tab={tab} />;

    default:
      return <div>Nieznany typ wizualizacji</div>;
  }
};