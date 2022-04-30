import React from 'react'
import styles from './Search.module.scss'

const SearchTag = ({ setTagSearch }) => {
  return (
    <form
      className={`${styles.search} d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5`}
    >
      <input
        onChange={(e) => {
          setTagSearch(e.target.value)
        }}
        placeholder="Search by tag"
        className={styles.input}
        type="text"
      />
    </form>
  )
}

export default SearchTag
