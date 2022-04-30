import React, { useState } from 'react'

const TagsInput = ({ selectedTags, tags, setTags, id }) => {
  let [ update, triggerUpdate ] = useState(0);
  
  const addTags = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      let updatedTags = tags;
      if (tags[id]) {
        updatedTags[id].push(event.target.value);
      } else {
        updatedTags[id] = [event.target.value];
      }
      setTags(updatedTags)
      selectedTags(updatedTags)
      triggerUpdate(update + 1);
      event.target.value = ''
    }
  }
  const removeTags = (index) => {
    let updatedTags = tags;
    updatedTags[id] = tags[id].filter((tag) => tags[id].indexOf(tag) !== index)
    setTags(updatedTags)
    triggerUpdate(update + 1)
  }

  return (
    <div className="tags-input">
      <ul>
        {tags[id] && tags[id].map((tag, index) => (
          <li key={index}>
            <span>{tag}</span>
            <i className="material-icons" onClick={() => removeTags(index)}>
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </i>
          </li>
        ))}
      </ul>

      <input
        type="text"
        onKeyUp={(event) => addTags(event)}
        placeholder="Add a tag"
      />
    </div>
  )
}
export default TagsInput
