const initialState = { 
   anchor: 'left',
   task: [],
   open: false,
   id: '',
   name: '',
   description: '',
   assignedTo: '',
   duedate: ''
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
               dueDate: action.dueDate
           };
       case "USER_UPDATED":
           return state;
       case "HANDLE_ON_CHANGE":
           return {
               ...state,
               [action.props]: action.value
           };
       default:
           return state
       }
}