import React from 'react';
import ThreeScene from './components/Threescene';


interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div style={{ paddingLeft: "540px", paddingTop: "100px" }}>
      <ThreeScene />
      <div id="cookies-simple-with-dismiss-button" className="fixed bottom-0 start-1/2 transform -translate-x-1/2 z-[60] sm:max-w-4xl w-full mx-auto p-6">
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div className="flex justify-between items-center gap-x-5 sm:gap-x-10">
            <div className="grow">
              <h2 className="text-sm text-gray-600 dark:text-neutral-400">
                En continuant d'utiliser Companion vous acceptez l'utilisation de Cookies en accord avec notre <a className="inline-flex items-center gap-x-1.5 text-orange-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-orange-500" href="#">Police de Cookies.</a>
              </h2>
            </div>
            <button type="button" className="p-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white" data-hs-remove-element="#cookies-simple-with-dismiss-button">
              <span className="sr-only">Dismiss</span>
              <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
        </div>
      </div>
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
