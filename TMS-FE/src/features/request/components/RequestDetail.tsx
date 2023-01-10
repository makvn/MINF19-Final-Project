import { Spin } from '@/component/Spin';
import { getDetailVehicle } from '@/features/admin/api/vehicles';
import { formatDate } from '@/utils/format';
import { showError } from '@/utils/global';
import { useRequest } from 'ahooks';
import { get } from 'lodash';
import React, { useEffect } from 'react';

export interface RequestDetailProps {
  row: any;
}

export const RequestDetail = (props: RequestDetailProps) => {
  const { row } = props;
  const {
    data: dataDriver,
    run: runGetDriver,
    loading: loadingDetail,
  } = useRequest(getDetailVehicle, {
    manual: true,
    onError: showError,
  });

  useEffect(() => {
    if (row) {
      const requestDetailId = row?.original?.id;
      runGetDriver(requestDetailId);
    }
  }, [row]);

  const renderItemExpand = (label: string, value: string) => {
    return <p>{`${label}: ${value}`}</p>;
  };
  console.log({ dataDriver });
  return (
    <div>
      <pre
        style={{
          fontSize: '14px',
          paddingLeft: '50px',
        }}
      >
        <div className="row">
          <div className="col-md-4">
            {renderItemExpand('Year of Manufacture', get(row, 'original.yearManufacture', ''))}
            {renderItemExpand('DriverID', get(dataDriver, 'data.driver.id', ''))}
            {renderItemExpand('DocumentId', get(row, 'original.documentId', ''))}
          </div>
          <div className="col-md-6">
            {renderItemExpand(
              'Full Name',
              (dataDriver?.data?.driver?.lastName || '') + ' ' + (dataDriver?.data?.driver?.firstName || ''),
            )}
            {renderItemExpand('Barge Registration Date', formatDate(get(row, 'original.dateRegistration', ''), false))}
            {renderItemExpand('Barge Expire Date', formatDate(get(row, 'original.dateExpire', ''), false))}
          </div>
        </div>
      </pre>
      <Spin isVisible={loadingDetail} />
    </div>
  );
};
