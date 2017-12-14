interface Import {
  assets: string[];
  libraries: string[];
  appModules: {
    [key: string]: string[];
  };
  [key: string]: any;
}
