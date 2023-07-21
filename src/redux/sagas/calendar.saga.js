import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Fetch Emerging Prairie calendar saga
function* fetchEmergingPrairieCalendarSaga() {
  try {
    const calendarData = yield call(axios.get, '/api/calendar/emerging-prairie');
    yield put({ type: 'SET_EP', payload: calendarData.data });
  } catch (error) {
    console.log('Error fetching Emerging Prairie calendar:', error);
  }
}

// Fetch Fargo Underground calendar saga
function* fetchFargoUndergroundCalendarSaga() {
  try {
    const calendarData = yield call(axios.get, '/api/calendar/fargo-underground');
    yield put({ type: 'SET_FU', payload: calendarData.data });
  } catch (error) {
    console.log('Error fetching Fargo Underground calendar:', error);
  }
}

// Fetch Chamber of Commerce calendar saga
function* fetchChamberCalendarSaga() {
  try {
    const calendarData = yield call(axios.get, '/api/calendar/chamber');
    yield put({ type: 'SET_CHAMBER', payload: calendarData.data });
  } catch (error) {
    console.log('Error fetching Chamber of Commerce calendar:', error);
  }
}

// Watcher saga for calendars
function* watchCalendars() {
  yield takeLatest('FETCH_EP_CALENDAR', fetchEmergingPrairieCalendarSaga);
  yield takeLatest('FETCH_FU_CALENDAR', fetchFargoUndergroundCalendarSaga);
  yield takeLatest('FETCH_CHAMBER_CALENDAR', fetchChamberCalendarSaga);
}

export default watchCalendars;
