// configureStore.js
import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'

import {userReducer} from './userReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store: any = createStore(persistedReducer)
export const persistor= persistStore(store)
