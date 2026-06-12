

/**
 * Reusable Card Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} [props.title] - Card header title (string or JSX element)
 * @param {React.ReactNode} props.children - Inner content of the card
 * @param {string} [props.className=''] - Custom Tailwind CSS classes to append
 */
export default function Card({
  title,
  children,
  className = '',
  ...props
}) {
  return (
    <div 
      className={`bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="px-5 py-4 border-b border-slate-100">
          {typeof title === 'string' ? (
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
