export type ThemeName = "light" | "dark";

export type TaskTheme = {
  screenBackground: string;
  panelBorder: string;
  panelBackground: string;
  titleText: string;
  subtitleText: string;
  inputBackground: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  primary: string;
  primaryText: string;
  taskRowBackground: string;
  taskRowBorder: string;
  checkBorder: string;
  taskText: string;
  taskTextCompleted: string;
  deleteBackground: string;
  deleteBorder: string;
  deleteText: string;
  emptyBackground: string;
  emptyBorder: string;
  toggleLabel: string;
};

export const taskThemes: Record<ThemeName, TaskTheme> = {
  light: {
    screenBackground: "#F2F7FC",
    panelBorder: "#D8E6F4",
    panelBackground: "#FFFFFF",
    titleText: "#113B67",
    subtitleText: "#4B6682",
    inputBackground: "#FFFFFF",
    inputBorder: "#C7D9EC",
    inputText: "#12385E",
    inputPlaceholder: "#8A97A8",
    primary: "#208AEF",
    primaryText: "#FFFFFF",
    taskRowBackground: "#FFFFFF",
    taskRowBorder: "#D8E6F4",
    checkBorder: "#87B9E9",
    taskText: "#193F64",
    taskTextCompleted: "#95A2B1",
    deleteBackground: "#FFF0F0",
    deleteBorder: "#FFD9D9",
    deleteText: "#C23333",
    emptyBackground: "#EAF3FD",
    emptyBorder: "#C7D9EC",
    toggleLabel: "#355674",
  },
  dark: {
    screenBackground: "#0C1420",
    panelBorder: "#24384F",
    panelBackground: "#132131",
    titleText: "#D5E9FF",
    subtitleText: "#9EBAD6",
    inputBackground: "#132131",
    inputBorder: "#2A4460",
    inputText: "#E4F1FF",
    inputPlaceholder: "#6E8CA8",
    primary: "#3A9AFF",
    primaryText: "#05111F",
    taskRowBackground: "#132131",
    taskRowBorder: "#24384F",
    checkBorder: "#4F82B6",
    taskText: "#D5E9FF",
    taskTextCompleted: "#7D95AE",
    deleteBackground: "#3A1B24",
    deleteBorder: "#6B2D3A",
    deleteText: "#FF9BAE",
    emptyBackground: "#102033",
    emptyBorder: "#2A4460",
    toggleLabel: "#BBD2EA",
  },
};
