import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const DestinationCard = ({ destination, index = 0 }) => {
  const { name, tagline, badge, image, alt, highlights, altitude } = destination;

  // Alternate side entry based on column index
  const initialX = index % 3 === 0 ? -60 : index % 3 === 2 ? 60 : 0;
  const initialY = index % 3 === 1 ? 50 : 0;

  return (
    <motion.article
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-xl min-h-[380px] sm:min-h-[420px]"
    >
      {/* Background Image with subtle zoom on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={alt || `${name} destination photography`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Editorial gradient overlays for optimum readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/20" />
      </div>

      {/* Top Badges */}
      <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-black/40 text-emerald-300 backdrop-blur-md border border-white/10">
          <FiMapPin size={13} className="text-emerald-400" />
          {badge}
        </span>
        {altitude && (
          <span className="text-xs font-semibold text-white/80 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
            {altitude}
          </span>
        )}
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 p-6 sm:p-7 pt-0 flex flex-col justify-end">
        <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
          DevBhoomi Destination
        </span>
        <h3 className="mt-1.5 text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
          {name}
        </h3>
        <p className="mt-2 text-sm text-slate-200/90 leading-relaxed max-w-sm line-clamp-2">
          {tagline}
        </p>

        {/* Highlights Tags */}
        {highlights && highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {highlights.map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium text-white/70 bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
          <Link
            to={`/hotels?destination=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-emerald-300 transition-colors"
          >
            <span>Explore stays in {name}</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default DestinationCard;
