import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await axios.get('http://localhost:5000/api/reports/latest');
      setReport(res.data);
    };
    fetchReport();
  }, []);

  return (
    <div>
      {report && (
        <>
          <BasicDetails data={report.basicDetails} />
          <ReportSummary data={report.reportSummary} />
          <CreditAccounts data={report.creditAccounts} />
        </>
      )}
    </div>
  );
};