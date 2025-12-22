import type { VisualizationTab } from "../../types/visualization";

export const VisualizationRenderer: React.FC<{ tab: VisualizationTab }> = ({
  tab
}) => {
  switch (tab.type) {
    case "chart":
      return <div>📈 Widok wykresów</div>;
    case "graph":
      return <div>🕸 Graf sieciowy</div>;
    case "dashboard":
      return <div>📊 Dashboard analityczny</div>;
    case "comparison":
      return <div>🔀 Widok porównawczy</div>;
    default:
      return null;
  }
};
