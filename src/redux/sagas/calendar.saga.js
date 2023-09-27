import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Fetch Emerging Prairie events
function* fetchEmergingPrairieCalendarSaga() {
  try {
    yield put({ type: 'SET_LOADING_EP'});// set load to true
    const calendarData = yield call(axios.get, '/api/calendar/emerging-prairie');
    yield put({ type: 'SET_EP', payload: calendarData.data }); //Sets the EP reducer.
    yield put({ type: 'CLEAR_LOADING_EP'}); // set load to false
  } catch (error) {
    console.log('Error fetching Emerging Prairie calendar:', error);
    yield put({ type: 'CLEAR_LOADING_EP'}); // set load to false, even if an error occurs
  }
}

// Clear Emerging Prairie events
function* clearEmergingPrairieCalendarsSaga() {
  yield put({ type: 'SET_EP', payload: [] });
}

// Fetch Fargo Underground calendar saga
function* fetchFargoUndergroundCalendarSaga() {
  try {
    yield put({ type: 'SET_LOADING_FU'});// set load to true
    const calendarData = yield call(axios.get, '/api/calendar/fargo-underground');
    yield put({ type: 'SET_FU', payload: calendarData.data }); //Set the FU recucer
    yield put({ type: 'CLEAR_LOADING_FU'}); // set load to false
  } catch (error) {
    console.log('Error fetching Fargo Underground calendar:', error);
    yield put({ type: 'CLEAR_LOADING_FU'}); // set load to false, even if an error occurs
  }
}

// Clear Fargo Underground events
function* clearFargoUndergroundCalendarSaga() {
  yield put({ type: 'SET_FU', payload: [] });
}

// Fetch Chamber of Commerce calendar saga
function* fetchChamberCalendarSaga() {
  try {
    yield put({ type: 'SET_LOADING_CHAMBER'});// set load to true
    const calendarData = yield call(axios.get, '/api/calendar/chamber');
    yield put({ type: 'SET_CHAMBER', payload: calendarData.data }); //Set the Chamber reducer
    yield put({ type: 'CLEAR_LOADING_CHAMBER'}); // set load to false
  } catch (error) {
    console.log('Error fetching Chamber of Commerce calendar:', error);
    yield put({ type: 'CLEAR_LOADING_CHAMBER'}); // set load to false, even if an error occurs
  }
}

// Clear Chamber of Commerce events
function* clearChamberCalendarSaga() {
  yield put({ type: 'SET_CHAMBER', payload: [] });
}

// Fetch NDSU CEFB calendar saga
function* fetchCEFBSaga() {
  try {
    yield put({ type: 'SET_LOADING_CEFB'});// set load to true
    const calendarData = yield call(axios.get, '/api/calendar/cefb');
    yield put({ type: 'SET_CEFB', payload: calendarData.data }); //Set the CEFB reducer
    yield put({ type: 'CLEAR_LOADING_CEFB'}); // set load to false
  } catch (error) {
    console.log('Error fetching NDSU CEFB calendar:', error);
    yield put({ type: 'CLEAR_LOADING_CEFB'}); // set load to false, even if an error occurs
  }
}

// Clear NDSU CEFB events
function* clearCEFBCalendarSaga() {
  yield put({ type: 'SET_CEFB', payload: [] });
}

// Clear all calendars saga
function* clearCalendarsSaga() {
  yield put({ type: 'SET_EP', payload: [] });
  yield put({ type: 'SET_FU', payload: [] });
  yield put({ type: 'SET_CHAMBER', payload: [] });
  yield put({ type: 'SET_CEFB', payload: [] });
}

// Watcher saga for calendars
function* watchCalendars() {
  yield takeLatest('FETCH_EP', fetchEmergingPrairieCalendarSaga);
  yield takeLatest('CLEAR_EP', clearEmergingPrairieCalendarsSaga);
  yield takeLatest('FETCH_FU', fetchFargoUndergroundCalendarSaga);
  yield takeLatest('CLEAR_FU', clearFargoUndergroundCalendarSaga);
  yield takeLatest('FETCH_CHAMBER', fetchChamberCalendarSaga);
  yield takeLatest('CLEAR_CHAMBER', clearChamberCalendarSaga);
  yield takeLatest('FETCH_CEFB', fetchCEFBSaga);
  yield takeLatest('CLEAR_CEFB', clearCEFBCalendarSaga);
  yield takeLatest('CLEAR_CALENDARS', clearCalendarsSaga);
}

export default watchCalendars;