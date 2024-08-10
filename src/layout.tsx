import React from 'react';
import ThreeScene from './components/Threescene';


interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div style={{paddingLeft:"540px",paddingTop:"100px"}}>
      <ThreeScene />
      <head>
        <title>{title}</title>
      </head>
      <body>
        {children}
      </body>
    </div>
  );
};

export default Layout;
