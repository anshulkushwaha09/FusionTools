const Input = ({ 
  label, 
  textarea = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-300 ml-1">{label}</label>}
      {textarea ? (
        <textarea
          className="w-full bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors resize-none"
          {...props}
        />
      ) : (
        <input
          className="w-full bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-colors"
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
