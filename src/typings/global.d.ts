declare module '*.css'
declare module 'react' {
  import * as React from "react/index";
  export interface CSSProperties extends React.CSSProperties {
    [key: `--${string}`]: string | number;
  }
  export = React;
}

