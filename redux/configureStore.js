import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { persistCombineReducers, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
 

import { favorites } from './favorites';

export const ConfigureStore = () =>{  

    const config ={
        key: 'root',
        storage: AsyncStorage,
        debug: true
    };

    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)  
    );

    const persistor = persistStore(store);
    return { store, persistor }
}