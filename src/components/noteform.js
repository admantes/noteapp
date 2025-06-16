export function NoteForm({ saveNote, cancelNewNote, note, setNote, setShowNoteForm }) {
    return (        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-20 backdrop-blur-sm">
            <div className="w-full max-w-5xl h-[90vh] bg-gray-900/95 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out border border-gray-700/50">
                <div className="flex flex-col h-full p-6">
                    <input
                        type="text"
                        placeholder="Title"
                        value={note.titleText}
                        onChange={(e) => setNote({ ...note, titleText: e.target.value })}
                        className="mb-4 w-full p-3 border-b-2 border-gray-700 focus:border-orange-500 outline-none text-2xl font-semibold transition-all duration-300 bg-transparent text-gray-100 placeholder-gray-400"
                    />                    <textarea
                        placeholder="Take a note..."
                        value={note.contentText}
                        onChange={(e) => setNote({ ...note, contentText: e.target.value })}
                        className="flex-grow w-full p-3 border-b-2 border-gray-700 focus:border-orange-500 outline-none resize-none bg-transparent text-gray-100 text-lg placeholder-gray-400"
                    />
                    <div className="flex justify-end space-x-3 pt-4">
                        <button 
                            onClick={cancelNewNote} 
                            className="px-6 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors duration-300 text-lg"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={saveNote} 
                            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}