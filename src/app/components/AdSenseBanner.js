import { useEffect } from 'react';

export default function AdSenseBanner({
  adClient,
  adSlot,
  adFormat = 'auto',
  responsive = true,
  style = { display: 'block' },
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    ></ins>
  );
}
