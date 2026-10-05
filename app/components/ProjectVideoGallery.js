function sourceName(value) {
  const source = String(value || '').toLowerCase();
  if (source.includes('instagram.com')) return 'Instagram Reel';
  if (source.includes('youtube.com') || source.includes('youtu.be')) return 'YouTube';
  if (source.includes('facebook.com')) return 'Facebook Video';
  return 'Project Video';
}

export default function ProjectVideoGallery({ items }) {
  return (
    <div className="projectVideoGrid">
      {items.map((item, index) => {
        const url = item.source_url || item.image_url;
        return (
          <a className="projectVideoCard" key={item.id} href={url} target="_blank" rel="noopener noreferrer">
            <span className="videoPlay" aria-hidden="true">▶</span>
            <span className="videoSource">{sourceName(url)}</span>
            <strong>{item.alt_text || `Official project video ${index + 1}`}</strong>
            <small>Open video ↗</small>
          </a>
        );
      })}
    </div>
  );
}
