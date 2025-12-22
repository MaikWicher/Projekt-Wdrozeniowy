import type { IconType } from "react-icons";

export type VisualizationType =
  | "chart"
  | "graph"
  | "dashboard"
  | "comparison";

export interface VisualizationTab {
  id: string;
  title: string;
  type: VisualizationType;
  icon: IconType;
  content: unknown;
  isDirty: boolean;
  isClosable: boolean;
  isPinned: boolean;
}
