import Head from 'next/head';

export default function DeviceTest({ deviceType, dogImageUrl, timestamp, cacheControl }) {
  return (
    <div>
      <Head>
        <title>Device-Based Cache Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>        
        <div>
          <p><strong>Detected Device:</strong> {deviceType}</p>
          <p><strong>Cached Timestamp:</strong> {timestamp}</p>
        </div>

        <div>
          <h2>Random Dog for {deviceType} Users</h2>
          <img 
            src={dogImageUrl} 
            alt={`Random dog for ${deviceType}`} 
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  console.log('All request headers:', req.headers);
  
  const deviceType = 
    req.headers['device-type'] || 
    req.headers['Device-Type'] || 
    req.headers['DEVICE-TYPE'] || 
    'unknown';
  
  console.log(`Device type from headers: ${deviceType}`);
  
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  const detectedDeviceType = isMobile ? 'mobile' : 'desktop';
  
  console.log(`Device type from user agent detection: ${detectedDeviceType}`);
  
  const finalDeviceType = deviceType !== 'unknown' ? deviceType : detectedDeviceType;
  
  // if (finalDeviceType === 'mobile') {
  //   res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  // } else {
  //   res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');
  // }
  
  const apiRes = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await apiRes.json();
  
  const timestamp = new Date().toISOString();
  console.log(`Generated new response at: ${timestamp}`);

  return { 
    props: { 
      deviceType: finalDeviceType, // Change this line
      dogImageUrl: data.message,
      timestamp,
      // cacheControl: finalDeviceType === 'mobile'  // don't mess w/ cache control
      //   ? "no-store, no-cache, must-revalidate, proxy-revalidate"
      //   : "public, s-maxage=3600, stale-while-revalidate=59"
    } 
  };
}