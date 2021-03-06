import React, { useState, useEffect } from 'react'
import Search from './Search/SearchName'
import SearchTag from './Search/SearchTag'
import TagsInput from './TagsInput'

const StudentProfile = () => {
  const [fetchedData, setFetchedData] = useState(null)
  const [pageError, setPageError] = useState(null)
  let [search, setSearch] = useState('')
  let [tags, setTags] = useState({})
  let [tagSearch, setTagSearch] = useState('')

  const selectedTags = (tags) => tags

  let api = `https://api.hatchways.io/assessment/students/`

  useEffect(() => {
    //set up with api call
    function fetchData() {
      const abortController = new AbortController()
      setPageError(null)

      fetch(api)
        .then((response) => response.json())
        .then(setFetchedData)
        .catch(setPageError)

      return () => abortController.abort(pageError)
    }
    fetchData()
  }, [])
  
  if (fetchedData) {
    let { students } = fetchedData
    return (
      <div className="row">
        <div className="container">
          <div className="col-12">
            <Search setSearch={setSearch} />
            <SearchTag setTagSearch={setTagSearch} />
            <div className="row">
              {students.map((student, index) => {
                let {
                  id,
                  company,
                  email,
                  firstName,
                  grades,
                  lastName,
                  pic,
                  skill,
                } = student //deconstruct student object

                function findAverage(grades) {
                  //get average of grades for each student
                  let average = grades.reduce(
                    (start, end, index, grades) => start + end / grades.length,
                    0
                  )
                  return average
                }
                let fullName = firstName.toLowerCase() + lastName.toLowerCase() // search full names
                let cleanSearch = search.toLowerCase().split(' ').join('') // ignore spaces in search
                let cleanTagSearch = tagSearch.toLowerCase().split(' ').join('') // ignore spaces in search

                if (fullName.toLowerCase().includes(cleanSearch)) {
                  if (
                    cleanTagSearch.length === 0 ||
                    (tags[id] &&
                      tags[id].filter((tag) =>
                        tag.toLowerCase().includes(cleanTagSearch)
                      ).length > 0)
                  ) {
                    return (
                      <ul>
                        <li key={index}>
                          <div className="profile">
                            <div className="row">
                              <div className="col-2">
                                <img
                                  className="icon img-fluid"
                                  src={`${pic}`}
                                  alt={`${firstName}`}
                                />
                              </div>
                              <div className="col-9">
                                <div className="name fw-bold fs-1">
                                  {`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
                                </div>
                                <div className="">{`Email: ${email}`}</div>
                                <div className="">{`Company: ${company}`}</div>
                                <div className="">{`Skill: ${skill}`}</div>
                                <div className="">
                                  {`Average: ${findAverage(grades)}`}
                                </div>
                                <div className="tag">
                                  <TagsInput
                                    selectedTags={selectedTags}
                                    tags={tags}
                                    setTags={setTags}
                                    id={id}
                                  />
                                </div>
                              </div>
                              <div className="collapse hide" id={`collapse-${index}`}>
                                {grades.map((grade, index) => {
                                  return (
                                    <>
                                      <ul>
                                        <li>
                                          <div className="list-style-none text-decoration-none">{`Test ${index}   ${grade}`}</div>
                                        </li>
                                      </ul>
                                    </>
                                  )
                                })}
                              </div>
                              <div className="col-1">
                                <button
                                  type="button"
                                  className="btn btn-white"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse-${index}`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    fill="currentColor"
                                    className="bi bi-plus"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    )
                  }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentProfile
