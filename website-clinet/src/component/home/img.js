import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';


class Img extends Component {
  render() {
    const images = [
        {
          original: '//www.baidu.com/img/bd_logo1.png',
          thumbnail: '//www.baidu.com/img/bd_logo1.png',
        },
        {
          original: '//www.baidu.com/img/bd_logo1.png',
          thumbnail: '//www.baidu.com/img/bd_logo1.png'
        },
        {
          original: '//www.baidu.com/img/bd_logo1.png',
          thumbnail: '//www.baidu.com/img/bd_logo1.png'
        },
        {
          original: '//www.baidu.com/img/bd_logo1.png',
          thumbnail: '//www.baidu.com/img/bd_logo1.png'
        }
    ]
    return (
      <div>
      <div>
      <div style={{
          minHeight: '6rem',
          textAlign: 'center',
          fontSize: '2rem',
          lineHeight: '5rem'
      }}><p className="imgTitle">业务范围</p></div>
      <div style={{
        height: '20rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '2rem'
      }} className="business">
      {images.map((item) => {
          return <div style={{
             width: '20rem',
             padding: '1rem'}}>
             <img src="//www.baidu.com/img/bd_logo1.png" style={{
              height: '100%', width: '100%',}}/>
            </div>
      })}
      </div>
      </div>
      
      <div>
        <div style={{
            minHeight: '8rem',
            textAlign: 'center',
            fontSize: '2rem',
            lineHeight: '8rem'}}>
        <p className="imgTitle">公司环境</p></div>
        <div style={{height: '35rem', width: '100%'}} 
             slideInterval={5000} 
             className="imageSamllPhoneStyle">
            <ImageGallery 
              items={images} 
              autoPlay={true} 
              showFullscreenButton={false}
              showNav={false}
              showPlayButton={false}
            />
        </div>
      </div>
      </div>
    );
  }
}

export default Img;
