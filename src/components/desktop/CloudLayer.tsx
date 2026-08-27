export default function CloudLayer() {
  return (
    <div className="cloud-wrapper absolute top-0 left-0 w-full h-[120px] sm:h-[220px] pointer-events-none overflow-hidden">
      {/* Cloud Back Layer */}
      <div className="z-10  opacity-90 cloud-strip animate-clouds-back">
        <img src="/assets/cloudback.png" className="cloud-img" />
        <img src="/assets/cloudback.png" className="cloud-img" />
      </div>

      {/* Cloud Front Layer */}
      <div className="z-20 opacity-90 cloud-strip absolute top-0 left-0 animate-clouds-front">
        <img src="/assets/cloudfront.png" className="cloud-img" />
        <img src="/assets/cloudfront.png" className="cloud-img" />
      </div>
    </div>
  );
}
