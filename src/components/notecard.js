export function NoteCard({ note, onPin, onDelete, hasImage, onImageClick }) {
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
            {/* Delete Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.GUID);
                }}
                className="absolute top-2 left-2 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all duration-300"
                title="Delete note"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
            <div className="flex items-center gap-2 mb-2">
                {note.isPinned && (                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20">
                        Pinned
                    </span>
                )}
                <h3 className="text-xl font-semibold text-gray-100">{note.titleText}</h3>
                {hasImage && (
                    <button
                        className="ml-2 text-orange-400 hover:text-orange-600"
                        title="View image"
                        onClick={onImageClick}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                            <circle cx="8.5" cy="12.5" r="1.5" />
                            <path d="M21 19l-5.5-5.5a2.121 2.121 0 00-3 0L3 19" />
                        </svg>
                    </button>
                )}
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
