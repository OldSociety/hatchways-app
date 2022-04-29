import React, { useState, useEffect } from 'react'
import { listStudents } from '../utils/api';

const Home = () => {
  const [fetchedData, setFetchedData] = useState(null)
  const [pageError, setPageError] = useState(null);

  const url = `https://api.hatchways.io/assessment/students`

  

  useEffect(() => {
    function fetchData() {
        const abortController = new AbortController() 
        setPageError(null)

        listStudents(abortController.signal).then(setFetchedData).catch(setPageError);
        return () => abortController.abort();
    }
    fetchData()
  }, [])

  fetchedData()

  return (
    <div className="row">
    <div className="container">
      <div className="col-12">
        <div className="row">
            {fetchedData}
          {/* <Cards page="/" results={fetchedData} /> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
