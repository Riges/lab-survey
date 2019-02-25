import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ApplicationState } from '../store/reducers';
import { SurveyActionKind } from '../store/survey/types';

const surveyEpic: Epic<SurveyActionKind.StepCompleted, SurveyActionKind.StepCompleted, ApplicationState> = (action$, store) =>
  action$.ofType(SurveyActionKind.StepCompleted).mergeMap(action =>
    ajax
      .post(
        './api',
        { ...store.getState().survey, completedSteps: store.getState().survey.completedSteps.toObject() },
        { 'Content-Type': 'application/json' }
      )
      .map(res => Observable.empty())
      .catch((error: ErrorEvent) => {
        return Observable.throw(error.message);
      })
  );

export default surveyEpic;
