export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folders.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id.toString() === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folders_id.toString() === folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folders_id === folderId).length