import { useEffect, useState } from 'react';
import Footer from './components/Footer';

import { client } from './sanity/client';
import { footerQuery } from './sanity/queries';

export default function App() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    client.fetch(footerQuery)
      .then(setFooterData)
      .catch(console.error);
  }, []);

  return (
    <>
      {/* other sections */}
      
      {footerData && <Footer data={footerData} />}
    </>
  );
}