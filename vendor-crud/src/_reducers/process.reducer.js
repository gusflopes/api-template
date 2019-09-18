import moment from 'moment';

const initialState = { 
   anchor: 'left',
   process: [],
   open: false,
   id: '',
   pasta: '',
   numero_processo: '',
   cliente: '',
   tipo: '',
   status: '',
   propositura: moment(Date.now()).format('DD/MM/YYYY'),
   juizo: '',
   comarca: '',
   tribunal: '',
   observacoes: ''
};

export function process(state = initialState, action) {
   switch (action.type) {
       case 'FETCHED_ALL_PROCESS':
           return {
               ...state,
               process: action.process
           };
       case 'PROCESS_DETAIL':
           return {
               ...state,
               // configurar
               id: action.id,
               name: action.name,
               description: action.description,
               assignedTo: action.assignedTo,
               dueDate: moment(action.dueDate).format('DD/MM/YYYY')
           };
       case "USER_UPDATED":
           return state;
       case "HANDLE_ON_CHANGE":
           return {
               ...state,
               [action.props]: action.value
           };
        case "HANDLE_ON_DATECHANGE":
                return {
                ...state,
                [action.props]: action.value
            }
       default:
           return state
       }
}