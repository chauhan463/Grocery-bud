import React, { useEffect } from 'react'

const Alert = ({alert}) => {
  const alertclass=`alert ${alert.type==="success"?" alert-success":" alert-danger"}`
  return <div className={alertclass}>{alert.msg}</div>
}

export default Alert
