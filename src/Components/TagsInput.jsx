import React, { useState } from 'react'

const TagsInput = ({ selectedTags }) => {
  const [tags, setTags] = useState([])
  const addTags = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTags([...tags, event.target.value])
      selectedTags([...tags, event.target.value])
      event.target.value = ''
    }
  }
  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)])
  }

  return (
    <div className="tags-input">
      <ul>
        {tags.map((tag, index) => (
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
