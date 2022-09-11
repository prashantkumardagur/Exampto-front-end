import { useState, useEffect } from "react";

import Section from "../../components/dashboard/Section";
import DataItem from "../../components/ui/DataItem";




const AnalyticsSection = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });




  return (<>
    <Section heading="Exam Analytics" loading={loading}>
      <div className="grid-md-2 gap-3">
        <DataItem heading="Total Exams Created" value="10" />
        <DataItem heading="Total Exams Live" value="2" />
        <DataItem heading="Total Exams Completed" value="8" />
        <DataItem heading="Practice Exams" value="5" />
      </div>
    </Section>
    <Section heading="Participation Analytics" loading={loading}>
      <div className="grid-md-2 gap-3">
        <DataItem heading="Total Students Enrolled" value="100" />
        <DataItem heading="Total Students Participated" value="50" />
        <DataItem heading="Total Students" value="200" />
        <DataItem heading="Practice Test Participation" value="160" />
      </div>
    </Section>
  </>);
}

export default AnalyticsSection;