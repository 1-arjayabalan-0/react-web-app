import { combineReducers } from "redux";
import { routerReducer as router, RouterState } from "react-router-redux";

interface StoreEnhancerState {}
export interface RootState extends StoreEnhancerState {
  router: RouterState;
}
export const rootReducer = combineReducers<RootState>({
  router,
});