import User from '../models/User';
import UserAction from '../models/UserAction';

export const getUser = (user: User):UserAction => ({
    type: 'GET_USER',
    user
});

export const updateUser = (user: User):UserAction => ({
    type: 'UPDATE_USER',
    user
})