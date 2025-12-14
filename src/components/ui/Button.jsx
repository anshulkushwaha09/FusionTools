import { ArrowRight, Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  type = 'button',
  icon = null
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-white shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] border border-transparent",
    secondary: "bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]",
    outline: "bg-transparent text-[#00f3ff] border border-[#00f3ff] hover:bg-[rgba(0,243,255,0.1)]"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" size={20} /> : icon}
      {children}
    </button>
  );
};

export default Button;
