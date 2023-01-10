export const STATUS_ACCOUNT = {
  ACTIVE: 'AC',
  INACTIVE: 'IA',
};

export const getStatusAccount = (status: string) => {
  switch (status) {
    case STATUS_ACCOUNT.ACTIVE: {
      return 'Active';
    }
    case STATUS_ACCOUNT.INACTIVE: {
      return 'InActive';
    }
    default: {
      return '';
    }
  }
};
