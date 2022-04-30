import React from 'react'
import styles from './Search/Search.module.scss'

const Tags = ({ setCreateTag }) => {
  return (
    <form
      className={`${styles.search} d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5`}
    >
      <input
        onChange={(e) => {
          setCreateTag(e.target.value)
        }}
        placeholder="Add a tag"
        className={styles.input}
        type="text"
      />
    </form>
  )
}

export default Tags
