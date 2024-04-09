import {  Editor, Transforms } from 'slate'
// Define our own custom set of helpers.
const CustomEditor = {
    isBoldMarkActive(editor) {
      const marks = Editor.marks(editor)
      return marks ? marks.bold === true : false
    },
  
    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
  
      return !!match
    },
    isUndelineMarkActive(editor) {
      const marks = Editor.marks(editor)
      return marks ? marks.underline === true : false
    },
    isItalicMarkActive(editor) {
      const marks = Editor.marks(editor)
      return marks ? marks.italic === true : false
    },
  
    toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'bold')
      } else {
        Editor.addMark(editor, 'bold', true)
      }
    },
  
    toggleItalicMark(editor) {
      const isActive = CustomEditor.isItalicMarkActive(editor)

      if (isActive) {
        Editor.removeMark(editor, 'italic')
      } else {
        Editor.addMark(editor, 'italic', true)
      }
    },
  
    toggleUnderlineMark(editor) {
      const isActive = CustomEditor.isUndelineMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'underline')
      } else {
        Editor.addMark(editor, 'underline', true)
      }
    },
  
  
    toggleCodeBlock(editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
  }
  export default CustomEditor;