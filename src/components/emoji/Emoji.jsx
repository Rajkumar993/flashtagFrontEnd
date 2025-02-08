import EmojiPicker from 'emoji-picker-react'
import React from 'react'

const Emoji = ({setShowSend,setValue,emoji}) => {
  return (
<>
<EmojiPicker onEmojiClick={e=>{
    setValue(prev=>prev+e.emoji)
    setShowSend(false)
    }} height={340} open={emoji}/>
</>
  )
}

export default Emoji
