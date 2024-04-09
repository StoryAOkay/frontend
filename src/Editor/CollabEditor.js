import React, { useState, useCallback } from 'react'
import { createEditor, Editor, Transforms, Element } from 'slate'

import { Slate, Editable, withReact } from 'slate-react'
import CustomEditor from '../Helpers/CustomEditor'

const initialValue = [
  {children: [{ text: 'Abcd' }]},
]

const CollaborativeEditor = () => {
  return <SlateEditor />
}

const SlateEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable />
    </Slate>
  )
}
export default CollaborativeEditor;