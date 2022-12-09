import React, {useState, useRef} from 'react'
import './ImageUploadForm.css'

const ImageUploadForm = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isImageDropped, setIsImageDropped] = useState(false);
  const [dataLabel, setDataLabel] = useState('');
  const inputRef = useRef();

  const handleDefaultPropagation = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const dropEvent = data => {
    if(data.files.length > 1){
      console.log("Please drop just one photo");
      return;
    }
    const file = data.files[0];
    if(!file.type.startsWith('image/')){
      console.log("Please insert an image");
      return;
    }
		const reader = new FileReader();
		reader.readAsDataURL(file);
    reader.onload = () => {
      inputRef.current.style.backgroundImage = `url('${reader.result}')`;
    }
    setIsImageDropped(true);
    setDataLabel(file.name);
  }
  return (
    <div className='image-upload-form' id='image-upload-form'>
      <div className='card'>
        <div className='description'>
          <h2 className='headerD no-margin top-header'>Ai tupeu și crezi că ești</h2>
          <h2 className='headerD no-margin last'>amuzant?</h2>
          <p className='paragraphD no-margin'>Trimite-ne un mail și poate ai</p>
          <p className='paragraphD no-margin'>noroc să ne apuce râsul când îți</p>
          <p className='paragraphD no-margin bottom-paragraph'>vedem meme-ul.</p>
        </div>
        <div className='form'>
          <div className='description-element' >
            <p className='label-description'>Descriere</p>
            <input className='input-description' type='text' placeholder='descriere'/>
          </div>
          <div className='meme-element' >
            <p className='label-meme'>Meme (jpg, jpeg, png, gif)</p>
            <div 
              style={{position: 'relative'}}
              onDragOver={e => {
                handleDefaultPropagation(e);
                setIsDraggedOver(true);
              }}
              onDragEnd={e => {
                handleDefaultPropagation(e);
                setIsDraggedOver(false);
              }}
              onDragLeave={e => {
                handleDefaultPropagation(e);
                setIsDraggedOver(false);
              }}
              onDrop={e => {
                handleDefaultPropagation(e);
                dropEvent(e.dataTransfer);
                console.log(e.dataTransfer.files[0])
              }}
              className={`input-meme ${isDraggedOver ? 'input-meme--over' : ''} ${isImageDropped ? 'remove-border' : ''}`}
              >
              <div 
                ref={inputRef} 
                className={`meme__thumb ${isImageDropped ? '' : 'remove'}`} 
                data-label={dataLabel}>
              </div>
              <span className={`input-meme-text ${isImageDropped ? 'remove' : ''}`}>drag & drop image or click to upload</span>
              <input type='file' name='memeFile' className='memeFile' />
              <input 
                type="file" 
                style={{
                      opacity: 0.0,
                      position: 'absolute',
                      top: '0px', 
                      left: '0px', 
                      bottom: '0px', 
                      right: '0px', 
                      width: '100%', 
                      height:'100%',
                      border: 'none'
                      }} 
                accept=".jpg, .jpeg, .png, .gif"
                onChange={e => dropEvent(e.target)}
              />
            </div>
          </div>
          <button className='send-meme'>Trimite</button>
        </div>
      </div>
    </div>
  )
}

export default ImageUploadForm