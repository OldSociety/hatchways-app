import React, { useState, useEffect } from 'react'
// import { listStudents } from '../utils/api';

const Home = () => {
  const [fetchedData, setFetchedData] = useState(null)
  const [pageError, setPageError] = useState(null)

  useEffect(() => { //set up with api call
    function fetchData() {
      const abortController = new AbortController()
      setPageError(null)

      fetch('https://api.hatchways.io/assessment/students') 
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

                return (
                  <ul>
                    <li key={index}>
                      <img className="icon" src={`${pic}`} alt={`${firstName}`} />
                      <div className="name fw-bold fs-1">
                        {`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
                      </div>
                      <div className="">{`Email: ${email}`}</div>
                      <div className="">{`Company: ${company}`}</div>
                      <div className="">{`Skill: ${skill}`}</div>
                      <div className="">
                        {`Average: ${findAverage(grades)}`}
                      </div>
                    </li>
                  </ul>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
