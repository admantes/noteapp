import { useEffect, useState } from "react";
import { NoteCard } from "./components/notecard.js";
import { NoteForm } from "./components/noteform.js";
import { Background } from "./components/background.js";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotesApp() {
  const [allNotesData, setAllNotesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [note, setNote] = useState({ titleText: "", contentText: "" });
  const [editingNote, setEditingNote] = useState(null); // Track the note being edited
  const [isEditing, setIsEditing] = useState(false); // Track whether the app is in edit mode

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("allNotesData")) || [];
    setAllNotesData(storedNotes);
  }, []);

  const saveNote = () => {
    if (!note.titleText.trim() && !note.contentText.trim()) return;
    const newNote = {
      ...note,
      GUID: uuidv4(),
      charactersCount: note.contentText.length,
      isPinned: false,
    };
    const updatedNotes = [newNote, ...allNotesData];
    setAllNotesData(updatedNotes);
    localStorage.setItem("allNotesData", JSON.stringify(updatedNotes));
     toast.success("Note added!", { position: "top-right" });
 /*    setNote({ titleText: "", contentText: "" });
    setShowNoteForm(false); */
  };
  
  const cancelNewNote = () => {
    setShowNoteForm(false);
  };
  
  const resetNote = () => {
    setNote({ titleText: "", contentText: "" });
  };
  
   const newNote = () => {
     
    setNote({ titleText: "", contentText: "" });
    setShowNoteForm(true);
  };
 

  const saveEditedNote = () => {
    if (!editingNote) return;
    const updatedNotes = allNotesData.map((n) =>
      n.GUID === editingNote.GUID
        ? { ...editingNote, titleText: note.titleText, contentText: note.contentText, charactersCount: note.contentText.length }
        : n
    );
    setAllNotesData(updatedNotes);
    localStorage.setItem("allNotesData", JSON.stringify(updatedNotes));
    toast.success("Note updated!", { position: "top-right" });
    // Reset editingNote to the new value so isNoteUnchanged is true after save
    setEditingNote({ ...editingNote, titleText: note.titleText, contentText: note.contentText, charactersCount: note.contentText.length });
  };

  const filteredNotes = allNotesData.filter((n) =>
    n.titleText.toLowerCase().includes(searchText.toLowerCase()) ||
    n.contentText.toLowerCase().includes(searchText.toLowerCase())
  );

  const openEditScreen = (note) => {
    setEditingNote(note);
    setIsEditing(true);
    setNote({
      titleText: note.titleText,
      contentText: note.contentText,
    });
  };

  const togglePin = (noteId) => {
    const updatedNotes = allNotesData.map((note) =>
      note.GUID === noteId
        ? { ...note, isPinned: !note.isPinned }
        : note
    );
    setAllNotesData(updatedNotes);
    localStorage.setItem("allNotesData", JSON.stringify(updatedNotes));
  };

  const sortedAndFilteredNotes = filteredNotes
    .sort((a, b) => {
      // Sort by pinned status first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Then sort by date (newest first) - we could add a dateCreated field for this
      return 0;
    });

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isEditing) {
        setIsEditing(false);
        setEditingNote(null);
        setNote({ titleText: "", contentText: "" });
      }
    };

    const handleCtrlS = (event) => {
      if (isEditing && (event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (!isNoteUnchanged) {
          saveEditedNote();
        }
      }
    };

    const handleCtrlN = (event) => {
      if (!isEditing && (event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        newNote();
      }
    };

    if (isEditing) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('keydown', handleCtrlS);
    } else {
      document.addEventListener('keydown', handleCtrlN);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('keydown', handleCtrlS);
      document.removeEventListener('keydown', handleCtrlN);
    };
  }, [isEditing, note, editingNote]);

  // Helper to check if note is unchanged during editing
  const isNoteUnchanged = isEditing && editingNote &&
    note.titleText === editingNote.titleText &&
    note.contentText === editingNote.contentText;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <Background />
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Note Masta</h1>
          
          {/* Search and Add Section */}
          {!isEditing && (
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 shadow-md border border-gray-700/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300 text-gray-100 backdrop-blur-sm placeholder-gray-400"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button 
                onClick={() => newNote()} 
                className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 shadow-md"
              >
                Add Note
              </button>
            </div>
          )}
        </div>

        {/* Note Form */}
        {showNoteForm && !isEditing && (
          <NoteForm 
            saveNote={saveNote} 
            cancelNewNote={cancelNewNote} 
            note={note} 
            setNote={setNote} 
            setShowNoteForm={setShowNoteForm} 
          />
        )}

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="w-full max-w-5xl h-[90vh] bg-gray-900/95 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out mx-4 border border-gray-700/50">
              <div className="flex flex-col h-full p-3">
                <h2 className="text-xl font-bold mb-2 text-gray-100">
                  Edit
                </h2>
                <input
                  type="text"
                  placeholder="Title"
                  value={note.titleText}
                  onChange={(e) => setNote({ ...note, titleText: e.target.value })}
                  className="mb-2 w-full p-2 border-b-2 border-gray-700 focus:border-orange-500 outline-none text-xl font-semibold transition-all duration-300 bg-transparent text-gray-100"
                />
                <textarea
                  placeholder="Take a note..."
                  value={note.contentText}
                  onChange={(e) => setNote({ ...note, contentText: e.target.value })}
                  className="flex-grow w-full p-2 border-b-2 border-gray-700 focus:border-orange-500 outline-none resize-none bg-transparent text-gray-100 text-sm placeholder-gray-400"
                />
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors duration-300 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEditedNote}
                    disabled={isNoteUnchanged}
                    className={`px-4 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-sm ${isNoteUnchanged ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {!isEditing && !showNoteForm && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedAndFilteredNotes.map((note) => (
              <div
                key={note.GUID}
                onClick={() => openEditScreen(note)}
                className="cursor-pointer"
              >
                <NoteCard note={note} onPin={togglePin} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}