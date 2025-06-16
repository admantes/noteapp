export function NoteCard({ note, onPin }) {
    return (
        <div
            className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group border border-gray-700/50 text-sm"
            style={{ maxWidth: "300px", width: "100%" }}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPin(note.GUID);
                }}
                className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 
                    ${note.isPinned                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-gray-600'
                    }`}
                title={note.isPinned ? "Unpin note" : "Pin note"}
            >
                <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </button>
            <div className="flex items-center gap-2 mb-2">
                {note.isPinned && (                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20">
                        Pinned
                    </span>
                )}
                <h3 className="text-xl font-semibold text-gray-100">{note.titleText}</h3>
            </div>
            <p className="text-gray-300 mb-3 line-clamp-3">{note.contentText}</p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                    {note.charactersCount} characters
                </p>
            </div>
        </div>
    );
}
