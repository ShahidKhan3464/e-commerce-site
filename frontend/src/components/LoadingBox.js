import React from 'react'
import '..//Css/LoadingBox.css'

export default function LoadingBox() {
    return (
        <div className='LoadingBox'>
            <i className="fa fa-spinner fa-pulse"></i>
            <h2>Loading...</h2>
        </div>
    )
}
