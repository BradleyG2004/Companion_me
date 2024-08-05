import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
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
