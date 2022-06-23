import React from "react";


const FileInput = React.forwardRef((props, ref) => {
  return (
  <input 
      type='file' 
      name={props.name} 
      id={props.id} 
      accept={props.accept} 
      className='d-none' ref={ref} 
      onChange={props.onChange}
  />);
})


FileInput.defaultProps = {
  name: 'file',
  id: 'fileInput',
  className: '',
  accept: '*',
  onChange: () => { console.log('onChange'); },
}

export default React.memo(FileInput);