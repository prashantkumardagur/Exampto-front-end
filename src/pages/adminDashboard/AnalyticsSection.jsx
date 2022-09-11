import { useState, useEffect, useContext } from "react";

import Section from "../../components/dashboard/Section";
import DataItem from "../../components/ui/DataItem";

import AuthContext from "../../store/AuthContext";
import { getAnalyticsAPI } from "../../api/admin";



const AnalyticsSection = () => {
  const { token } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState({
                                      exams: { total: 0, live: 0, completed: 0, practice: 0 },
                                      participation: {total: 0, enrolled: 0, participated: 0, practice: 0 },
                                      financial: {
                                        recieved: 0,
                                        profit: 0,
                                        studentOwned: 0,
                                        collected: 0,
                                        distributed: 0,
                                        pending: 0,
                                      }
                                    });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getAnalytics = async () => {
      const response = await getAnalyticsAPI(token);
      if(response.status !== 'success') console.log(response.message);
      else setAnalytics({
        exams: response.data.ExamAnalytics,
        participation: response.data.StudentAnalytics,
        financial: response.data.MoneyAnalytics
      });
      setLoading(false);
    };

    getAnalytics();
  });




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
    <Section heading="Financial Analytics" loading={loading}>
      <div className="grid-md-2 gap-3">
        <DataItem heading="Total Money Recieved" value={analytics.financial.recieved} />
        <DataItem heading="Profit made" value={analytics.financial.profit} />
        <DataItem heading="Money in student ownership" value={analytics.financial.studentOwned} />
        <DataItem heading="Money gained by enrollment" value={analytics.financial.collected} />
        <DataItem heading="Prize money distributed" value={analytics.financial.distributed} />
        <DataItem heading="Future distribution pending" value={analytics.financial.pending} />
      </div>
    </Section>
  </>);
}

export default AnalyticsSection;