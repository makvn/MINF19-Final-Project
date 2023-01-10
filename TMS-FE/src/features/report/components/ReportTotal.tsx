import { useCallback } from 'react';
import { IReportTotal } from '../api/reports';

type ReportTotalProps = {
  report?: IReportTotal;
};

export const ReportTotal = (props: ReportTotalProps) => {
  const { report } = props;
  const renderItem = useCallback(
    (label: string, value?: number) => {
      return (
        <div style={{ marginBottom: 15, width: 'auto' }} className="col-md-6 col-lg-2 mr-5">
          <div className="card shadow p-3 mb-2 bg-white rounded report-item">
            <h4>{label}</h4>
            <h4>{value || 0}</h4>
          </div>
        </div>
      );
    },
    [report],
  );
  return (
    <div className="row">
      {renderItem('User', report?.user)}
      {renderItem('Booking', report?.booking)}
      {renderItem('Total Amount', report?.amount)}
    </div>
  );
};
