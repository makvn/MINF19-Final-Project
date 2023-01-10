import { Spin } from '@/component/Spin';
import { AuthLayout } from '@/features/admin';
import { showError } from '@/utils/global';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { getChartReportByMonth, getTotalReportByMonth } from '../api/reports';
import { Chart } from './Chart';
import { ReportTotal } from './ReportTotal';
import DatePicker from 'react-datepicker';
import { formatMonthPicker } from '@/utils/format';
import 'react-datepicker/dist/react-datepicker.css';

export const Report = () => {
  const [month, setMonth] = useState<Date | any>();
  const {
    run: runGetTotalReport,
    data: dataTotalReport,
    loading,
  } = useRequest(getTotalReportByMonth, {
    manual: true,
    onError: showError,
  });

  const {
    run: runGetChartReport,
    data: dataChartReport,
    loading: loadingChart,
  } = useRequest(getChartReportByMonth, {
    manual: true,
    onError: showError,
  });

  const handleReloadData = () => {
    const monthFormat = formatMonthPicker(month);
    runGetTotalReport({
      month: monthFormat,
    });
    runGetChartReport({
      month: monthFormat,
    });
  };

  useEffect(() => {
    handleReloadData();
  }, [month]);

  const renderPickerMonth = () => {
    return (
      <div style={{ paddingLeft: 0 }} className="col-md-4">
        <DatePicker
          className="form-control"
          clearButtonClassName={'form-datepicker-clear'}
          selected={month ? month : new Date()}
          placeholderText={'Select Date'}
          onChange={(date: any) => setMonth(date)}
          maxDate={new Date()}
          dateFormat="MMMM yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
        />
      </div>
    );
  };
  return (
    <div>
      <AuthLayout>
        <div className="main">
          <h5 style={{ marginBottom: 20 }}>Dashboard</h5>
          {renderPickerMonth()}
          <ReportTotal report={dataTotalReport?.data} />
          <br />
          <Chart dataChart={dataChartReport?.data} />
          <Spin isVisible={loading || loadingChart} />
        </div>
      </AuthLayout>
    </div>
  );
};
