import { useState, useEffect, useContext } from "react";

import Section from "../../components/dashboard/Section";
import DataItem from "../../components/ui/DataItem";

import AuthContext from "../../store/AuthContext";
import { getAnalyticsAPI } from "../../api/coordinator";



const AnalyticsSection = () => {
  const { token } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState({
                                      exams: { total: 0, live: 0, completed: 0, practice: 0 },
                                      participation: {total: 0, enrolled: 0, participated: 0, practice: 0 }
                                    });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getAnalytics = async () => {
      const response = await getAnalyticsAPI(token);
      if(response.status !== 'success') console.log(response.message);
      else setAnalytics({
        exams: response.data.ExamAnalytics,
        participation: response.data.StudentAnalytics
      });
      setLoading(false);
    };

    getAnalytics();
  }, [token]);




  return (<>
    <Section heading="Exam Analytics" loading={loading}>
      <div className="grid-md-2 gap-3">
        <DataItem heading="Total Exams Created" value={analytics.exams.total} />
        <DataItem heading="Total Exams Live" value={analytics.exams.live} />
        <DataItem heading="Total Exams Completed" value={analytics.exams.completed} />
        <DataItem heading="Practice Exams" value={analytics.exams.practice} />
      </div>
    </Section>
    <Section heading="Participation Analytics" loading={loading}>
      <div className="grid-md-2 gap-3">
        <DataItem heading="Total Students Enrolled" value={analytics.participation.enrolled} />
        <DataItem heading="Total Students Participated" value={analytics.participation.participated} />
        <DataItem heading="Total Students" value={analytics.participation.total} />
        <DataItem heading="Practice Test Participation" value={analytics.participation.practice} />
      </div>
    </Section>
  </>);
}

export default AnalyticsSection;