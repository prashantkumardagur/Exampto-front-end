import ScrollspyNav from "react-scrollspy-nav";


const ContentSideNav = (props) => {
  return (
    <ScrollspyNav
        scrollTargetIds={props.targetIds}
        offset={0}
        scrollDuration={500}
        activeNavClass="is-active"
    >
      <ul>
        {props.targetIds.map((targetId, index) => {
          return (
          <li key={`scroll-link-${index}`}>
            <a href={`#${targetId}`}>{targetId.split('-').splice(1).join(' ')}</a>
          </li>)
        })}
      </ul>
    </ScrollspyNav>
  );
}

export default ContentSideNav;