const Card = ({ children, className = '', title, icon }) => {
  return (
    <div className={`glass-panel p-6 rounded-2xl ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-6 border-b border-[rgba(255,255,255,0.1)] pb-4">
          {icon && <div className="text-[#00f3ff]">{icon}</div>}
          {title && <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{title}</h2>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
