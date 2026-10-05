const nearbyTypes = [
  { label: 'Schools', icon: '▣', query: 'schools' },
  { label: 'Hospitals', icon: '✚', query: 'hospitals' },
  { label: 'Malls', icon: '◇', query: 'shopping malls' },
  { label: 'Metro & transit', icon: '↔', query: 'metro stations and public transport' },
];

export default function NearbyPlaces({ projectName, location }) {
  const place = location || projectName;

  return (
    <section className="nearbyExplore" aria-label="Explore nearby places">
      <div>
        <span className="kicker">EXPLORE THE AREA</span>
        <h2>What's nearby</h2>
        <p>Explore local services around {projectName} in Google Maps. Maps provides the current distances, routes and opening information.</p>
      </div>
      <div className="nearbyPlaceGrid">
        {nearbyTypes.map((type) => (
          <a
            className="nearbyPlace"
            key={type.label}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${type.query} near ${place}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">{type.icon}</span>
            <strong>{type.label}</strong>
            <small>Explore on Maps ↗</small>
          </a>
        ))}
      </div>
    </section>
  );
}
