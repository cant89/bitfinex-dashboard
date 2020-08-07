import app from './app';
import ticker from './ticker';
import trades from './trades';
import book from './book';

const reducers = {
  ...app,
  ...ticker,
  ...trades,
  ...book
};

export default reducers;
