const Section = (props) => {
  let content = props.children;
  if(props.placeholder) content = <div className="bg3" style={{height: '120px'}}></div>

  return (
    <section className="pb-6">
      <h2 className="pb-2">{props.heading}</h2>
      {content}
    </section>
  );
}

export default Section;