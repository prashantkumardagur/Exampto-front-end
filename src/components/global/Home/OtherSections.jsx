const OtherSections = (props) => {
  return (<>
    <div className="home-features">
      <h2 className="headings">Features</h2>
      <div className="d-md-grid gap-3">
        <div className="home-feature">
          <img src="/svg/grades.svg" alt="feature" />
          <p>Participate in public contests to boost your knowledge on the subject.</p>
        </div>
        <div className="home-feature">
          <img src="/svg/money.svg" alt="feature" />
          <p>Win real cash for leading the leaderboard and compete with many others</p>
        </div>
        <div className="home-feature">
          <img src="/svg/graph.svg" alt="feature" />
          <p>Get continuous performance tracking and analysis of your test attempts.</p>
        </div>
        <div className="home-feature">
          <img src="/svg/notebook.svg" alt="feature" />
          <p>Get vast variety of practice tests from various exams and various subjects.</p>
        </div>
      </div>
    </div>
  </>);
}

export default OtherSections;