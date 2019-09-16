import moment from 'moment';

const initialState = { 
   anchor: 'left',
   task: [],
   open: false,
   id: '',
   name: '',
   description: '',
   assignedTo: '',
   dueDate: moment(Date.now()).format('DD/MM/YYYY')
};

export function task(state = initialState, action) {
   switch (action.type) {
       case 'FETECHED_ALL_TASK':
           return {
               ...state,
               task: action.task
           };
       case 'TASK_DETAIL':
           return {
               ...state,
               id: action.id,
               name: action.name,
               description: action.description,
               assignedTo: action.assignedTo,
               dueDate: moment(action.dueDate).format('DD/MM/YYYY')
           };
       case "USER_UPDATED":
           return state;
       case "HANDLE_ON_CHANGE":
           console.log("no Reducer");
           console.log(state);
           console.log(action.props);
           console.log(action.value);
           return {
               ...state,
               [action.props]: action.value
           };
        case "HANDLE_ON_DATECHANGE":
                console.log("no Reducer");
                console.log(state);
                console.log(action.props);
                console.log(action.value);
                return {
                ...state,
                [action.props]: action.value
            }
       default:
           return state
       }
}