import { useReducer } from "react";
import type { VisualizationTab, VisualizationType } from "../types/visualization";
import {
  FaChartLine,
  FaProjectDiagram,
  FaTachometerAlt,
  FaColumns
} from "react-icons/fa";

type TabsState = {
  tabs: VisualizationTab[];
  activeTabId: string | null;
};

type Action =
  | { type: "ADD_TAB"; tabType: VisualizationType }
  | { type: "CLOSE_TAB"; tabId: string }
  | { type: "ACTIVATE_TAB"; tabId: string }
  | { type: "PIN_TAB"; tabId: string }
  | { type: "REORDER_TABS"; tabs: VisualizationTab[] };

const iconMap = {
  chart: FaChartLine,
  graph: FaProjectDiagram,
  dashboard: FaTachometerAlt,
  comparison: FaColumns
};

const createTab = (type: VisualizationType): VisualizationTab => ({
  id: crypto.randomUUID(),
  title: "Nowa wizualizacja",
  type,
  icon: iconMap[type],
  content: null,
  isDirty: false,
  isClosable: true,
  isPinned: false
});

const reducer = (state: TabsState, action: Action): TabsState => {
  switch (action.type) {
    case "ADD_TAB": {
      const tab = createTab(action.tabType);
      return { tabs: [...state.tabs, tab], activeTabId: tab.id };
    }

    case "ACTIVATE_TAB":
      return { ...state, activeTabId: action.tabId };

    case "PIN_TAB":
      return {
        ...state,
        tabs: state.tabs.map(t =>
          t.id === action.tabId ? { ...t, isPinned: !t.isPinned } : t
        )
      };

    case "CLOSE_TAB": {
      const tab = state.tabs.find(t => t.id === action.tabId);
      if (!tab || tab.isPinned) return state;

      const tabs = state.tabs.filter(t => t.id !== action.tabId);
      let activeTabId = state.activeTabId;
      if (state.activeTabId === action.tabId) {
        activeTabId = tabs.length ? tabs[tabs.length - 1].id : null;
      }
      return { tabs, activeTabId };
    }

    case "REORDER_TABS":
      return { ...state, tabs: action.tabs };

    default:
      return state;
  }
};

export const useVisualizationTabs = () => {
  const [state, dispatch] = useReducer(reducer, { tabs: [], activeTabId: null });

  return {
    ...state,
    addTab: (type: VisualizationType) => dispatch({ type: "ADD_TAB", tabType: type }),
    closeTab: (id: string) => dispatch({ type: "CLOSE_TAB", tabId: id }),
    activateTab: (id: string) => dispatch({ type: "ACTIVATE_TAB", tabId: id }),
    pinTab: (id: string) => dispatch({ type: "PIN_TAB", tabId: id }),
    setTabs: (tabs: VisualizationTab[]) => dispatch({ type: "REORDER_TABS", tabs }),
    reorderTabs: (tabs: VisualizationTab[]) => dispatch({ type: "REORDER_TABS", tabs })
  };
};
