import React from 'react';

export default function Title() {
  return (
    <div className="container">
      <div className="row">
        <div className="anim-bg-pastel box-shadow col-xs"
            style={{'position':'relative', 'top':'0', 'right':'1vw'}}
           >
          <div className="title brutal-text-neon">
            <h1 className='text-center georgia-text'
              >
              <span style={{'display':'inline-block','transform': 'rotate(-15deg)'}}>C</span>
              laire
              <span style={{"display":"inline-block","transform":"rotate(15deg)"}} >
              s</span>List</h1>
          </div>
          <div>
            <p className=" arc-text text-center lime-text allcaps spread"
              style={{'padding-bottom': '1em'}}
            >
              A website for sharing
            </p>
          </div>
        </div>
    </div>
  </div>
  )
}
