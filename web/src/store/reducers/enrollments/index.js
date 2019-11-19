import produce from 'immer';
import { format, parseISO } from 'date-fns';

const INITIAL_STATE = {
  enrollment: null,
  list: null,
  loading: false,
  showError: null,
};

export default function enrollments(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/LOAD_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@enrollment/LOAD_SUCCESS': {
        draft.list = action.payload.enrollments;
        draft.loading = false;
        break;
      }

      case '@enrollment/LOAD_FAILURE': {
        draft.loading = false;
        draft.showError = action.payload.error;
        break;
      }

      // UPDATE
      case '@enrollment/UPDATE_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        draft.list = draft.list.filter(enrollment => {
          return [
            enrollment.id !== action.payload.enrollment.id,
            draft.enrollment,
          ];
        });
        break;
      }

      // ADD
      case '@enrollment/ADD_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        // const formattedEnrollment = draft.enrollment.map(enrollment => {
        //   const parsedStartDate = parseISO(enrollment.start_date);
        //   const parsedEndDate = parseISO(enrollment.end_date);

        //   return {
        //     ...enrollment,
        //     student: enrollment.student.name,
        //     plan: enrollment.plan.title,
        //     start_date: format(parsedStartDate, 'dd/MM/yyyy'),
        //     end_date: format(parsedEndDate, 'dd/MM/yyyy'),
        //   };
        // });
        draft.list = [...draft.list, action.payload.enrollment];
        break;
      }

      // DELETE
      case '@enrollment/DELETE_REQUEST': {
        draft.loading = false;
        break;
      }

      case '@enrollment/DELETE_SUCCESS': {
        draft.list = draft.list.filter(enrollment => {
          return enrollment.id !== action.payload.id;
        });
        draft.loading = false;
        break;
      }

      case '@enrollment/DELETE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}