import PageLoader from '../ui/PageLoader';


const Section = (props) => {
  let content = props.children;
  if(props.placeholder) content = <div className="bg3" style={{height: '120px'}}></div>
  if(props.loading) content = <PageLoader />;

  return (
    <section className="pb-7">
      <h2 className="pb-4">{props.heading}</h2>
      {content}
    </section>
  );
}

export default Section;