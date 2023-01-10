export const STATUS_ACCOUNT = {
  ACTIVE: 'AC',
  INACTIVE: 'IA',
  PENDING: 'PE',
};

export const getStatusVehicle = (status: string) => {
  switch (status) {
    case STATUS_ACCOUNT.ACTIVE: {
      return {
        label: 'Active',
        color: '#02a4f4',
      };
    }
    case STATUS_ACCOUNT.INACTIVE: {
      return {
        label: 'InActive',
        color: 'red',
      };
    }
    case STATUS_ACCOUNT.PENDING: {
      return {
        label: 'Pending',
        color: 'green',
      };
    }
    default: {
      return {
        label: '',
        color: 'black',
      };
    }
  }
};

export const STATUS_BOOKING = {
  AVAILABLE: 'Available',
  RETURN: 'Return',
  BOOKED: 'Booked',
};

export const getStatusBooking = (status: string) => {
  switch (status) {
    case STATUS_BOOKING.AVAILABLE: {
      return {
        label: 'Booking',
        color: '#02a4f4',
        status,
      };
    }
    case STATUS_BOOKING.BOOKED: {
      return {
        label: 'End Booking',
        color: 'green',
        status,
      };
    }

    default: {
      return null;
    }
  }
};
