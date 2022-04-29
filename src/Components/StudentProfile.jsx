import React, { useState, useEffect } from 'react'
import Search from './Search/Search'

const StudentProfile = () => {
  const [fetchedData, setFetchedData] = useState(null)
  const [pageError, setPageError] = useState(null)
  let [search, setSearch] = useState('')

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
            <div className="row">
              {students.map((student, index) => {
                let {
                  city,
                  company,
                  email,
                  firstName,
                  grades,
                  id,
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
                let fullName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`
                if (fullName.toLowerCase().includes(search.toLowerCase())) {
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
                          <div className="col-10">
                            <div className="name fw-bold fs-1">
                              {`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
                            </div>
                            <div className="">{`Email: ${email}`}</div>
                            <div className="">{`Company: ${company}`}</div>
                            <div className="">{`Skill: ${skill}`}</div>
                            <div className="">
                              {`Average: ${findAverage(grades)}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                )
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
