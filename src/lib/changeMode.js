const changeMode = (darkMode) => {
  const root = document.documentElement;
  if(darkMode){
    root.style.setProperty('--bg1', '#000');
    root.style.setProperty('--bg2', '#111');
    root.style.setProperty('--bg3', '#222');
    root.style.setProperty('--shadow', '#333');
    root.style.setProperty('--overlay', '#fff2');
    root.style.setProperty('--bg-inverse', '#f6f6f6');
    root.style.setProperty('--txt1', '#fff');
    root.style.setProperty('--txt2', '#ddd');
  } else {
    root.style.setProperty('--bg1', '#fff');
    root.style.setProperty('--bg2', '#f6f6f6');
    root.style.setProperty('--bg3', '#eee');
    root.style.setProperty('--shadow', '#ddd');
    root.style.setProperty('--overlay', '#0002');
    root.style.setProperty('--bg-inverse', '#060606');
    root.style.setProperty('--txt1', '#000');
    root.style.setProperty('--txt2', '#555');
  }
}

export default changeMode;