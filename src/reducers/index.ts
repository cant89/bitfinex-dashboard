import ticker from './ticker';
import trades from './trades';
import book from './book';

const reducers = {
  ...ticker,
  ...trades,
  ...book
};

export default reducers;
