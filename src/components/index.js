import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchText } from '../redux/textSlice';

function Text() {
  const text = useSelector((state) => state.text);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const [pNum, setPNum] = useState(4);
  const [pType, setPType] = useState('text');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchText(pNum, pType));
  }, [dispatch, pNum, pType]);

  const renderElements = (pNum) => {
    const elements = [];
    for (let i = 0; i < pNum; i++) {
      elements.push(<div key={i}><span className="placeholder"></span>
      <span className="placeholder w-100"></span>
      <span className="placeholder w-100"></span>
      <span className="placeholder col-3"></span><br/><br/></div>);
    }
    return elements;
  }

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-6 mx-auto topDiv'>
          <h1 className='text-center mt-5 mb-3 fw-bold'>Sample Text Generator</h1>
          <div className='text-center mb-4'>
            <a href='https://github.com/cagrierdemm'><img className='me-1 icon' src='./github.png' alt='github logo' width={24}/></a>
            <a href='https://www.linkedin.com/in/cagrierdemm/'><img className='ms-1 icon' src='./linkedin.png' alt='linkedin logo' width={24}/></a>
          </div>
          <div className='row mx-auto col-md-4 mb-5'>
            <div className='input-group mb-4'>
              <span className="input-group-text text-black-50" id="basic-addon1">Paragraphs</span>
              <input className="form-control" type='number' value={pNum} onChange={(e) => setPNum(e.target.value)} />
            </div>
            <div className='input-group'>
              <span className="input-group-text text-black-50" id="basic-addon1">Type</span>
              <select className="form-select" aria-label="Default select example" value={pType} onChange={(e) => setPType(e.target.value)} >
                <option value="text">Text</option>
                <option value="html">HTML</option>
              </select>
            </div>
          </div>
        </div>

      </div>
      <div className='row col-11 mx-auto mt-4 bottomDiv'>
        <div className='col-11 my-3 mx-auto p-3'>
          {status === 'loading' ? <>{renderElements(pNum)}
            </> : status === 'failed' ? <h3 className='text-center fw-bold'>Error: {error}</h3> : text.map((p, i) => (
              <p key={i}>{pType === 'html' ? "<p>" + p + "</p>" : p}</p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Text