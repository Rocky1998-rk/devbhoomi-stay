const HotelSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl bg-white border border-slate-200/80 p-4 shadow-sm animate-pulse flex flex-col space-y-4"
        >
          {/* Image skeleton */}
          <div className="aspect-[16/10] w-full bg-slate-200 rounded-2xl" />

          {/* Body skeleton */}
          <div className="space-y-2.5 px-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-12" />
            </div>
            <div className="h-6 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-100 rounded w-full" />
            <div className="h-3 bg-slate-100 rounded w-4/5" />

            <div className="flex gap-2 pt-2">
              <div className="h-5 bg-slate-100 rounded-md w-16" />
              <div className="h-5 bg-slate-100 rounded-md w-20" />
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between px-2">
            <div className="h-6 bg-slate-200 rounded w-24" />
            <div className="h-9 bg-slate-200 rounded-xl w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelSkeleton;
